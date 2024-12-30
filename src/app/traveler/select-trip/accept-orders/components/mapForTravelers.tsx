"use client";
import { useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { AddressObject } from "@/interfaces/Map/AddressObject";
import { UserInfo } from "@/interfaces/userInfo/userInfo";
import Link from "next/link";
import { PolyLine } from "./Polyline";
import { CompletedOrder } from "@/interfaces/Order/order";

type Route = {
  departureLocation: Omit<AddressObject, "formatted_address">;
  destinationLocation: Omit<AddressObject, "formatted_address">;
};

export default function MapForTravelers({
  route,
  orders,
}: {
  route: Route;
  orders: CompletedOrder[];
}) {
  const defaultCenter = {
    lat: route.departureLocation.lat || 0,
    lng: route.destinationLocation.lng || 0,
  };

  const [routeFound, setRouteFound] = useState(true);
  // Prepare the path for the PolyLine or Polygon
  const path = [
    {
      lat: route.departureLocation.lat || 0,
      lng: route.departureLocation.lng || 0,
    },
    {
      lat: route.destinationLocation.lat || 0,
      lng: route.destinationLocation.lng || 0,
    },
  ];

  return (
    <div className="mb-5">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GoogleMaps_API ?? ""}>
        <div className="h-screen mx-auto w-[80%]">
          {defaultCenter.lat && defaultCenter.lng && (
            <Map
              defaultZoom={10}
              defaultCenter={defaultCenter}
              mapId={process.env.NEXT_PUBLIC_GoogleMaps_MAPID}
              fullscreenControl={false}
            >
              {routeFound ? (
                <Directions route={route} onRouteFoundChange={setRouteFound} />
              ) : (
                <PolyLine path={path} />
              )}
              <ShowBuyers orders={orders} />
            </Map>
          )}
        </div>
      </APIProvider>
    </div>
  );
}

function Directions({
  route,
  onRouteFoundChange,
}: {
  route: Route;
  onRouteFoundChange: (found: boolean) => void;
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (
      !route ||
      !route.departureLocation.lat ||
      !route.destinationLocation.lat
    )
      return;

    directionsService
      .route({
        origin: new google.maps.LatLng(
          route.departureLocation.lat,
          route.departureLocation.lng
        ),
        destination: new google.maps.LatLng(
          route.destinationLocation.lat,
          route.destinationLocation.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        onRouteFoundChange(true);
      })
      .catch((e) => {
        console.log("Directions request failed due to " + e);
        onRouteFoundChange(false);
      });
  }, [directionsRenderer, directionsService]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="text-white w-1/3 absolute top-1 right-1 bg-slate-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Route: {selected?.summary}</h2>
      <p className="text-sm">
        From {leg.start_address.split(",")[0]} to{" "}
        {leg.end_address.split(",")[0]}
      </p>
      <p className="text-sm">Distance: {leg.distance?.text}</p>
      <p className="text-sm">Duration: {leg.duration?.text}</p>
      <ul className="mt-3 space-y-2">
        {routes.map((route, index) => {
          return (
            <li key={route.summary} className="list-none">
              <button
                onClick={() => setRouteIndex(index)}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              >
                Option {index + 1} : {route.summary}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ShowBuyers({ orders }: { orders: CompletedOrder[] }) {
  // State to keep track of the active marker's info
  const [activeMarker, setActiveMarker] = useState<{
    buyerInfo: UserInfo;
    orderId: string;
  } | null>(null);

  const handleMarkerClick = async (order: CompletedOrder) => {
    if (!order._id) {
      return;
    }
    try {
      const result: UserInfo = await apiClient(
        `/api/protected/getUserInfo/${order.buyerId}`
      );
      setActiveMarker({
        buyerInfo: result,
        orderId: order._id,
      });
    } catch (error) {
      console.error("Error fetching buyer info:", error);
    }
  };

  return (
    <>
      {orders.map((order) => {
        if (
          !order.preferredPickupPlace.lat ||
          !order.preferredPickupPlace.lng
        ) {
          return null;
        }
        const lat = order.preferredPickupPlace.lat as number;
        const lng = order.preferredPickupPlace.lng as number;
        return (
          <div key={order._id}>
            <AdvancedMarker
              position={new google.maps.LatLng(lat, lng)}
              onClick={() => handleMarkerClick(order)}
            >
              <div className="bg-blue-900 p-2 text-white font-bold">
                <p>Proposed Fee: {order.initialDeliveryFee}</p>
                <p>Product Price: {order.estimatedValue}</p>
              </div>
            </AdvancedMarker>

            {/* Only show InfoWindow for the active marker */}
            {activeMarker && activeMarker.orderId === order._id && (
              <InfoWindow
                position={new google.maps.LatLng(lat, lng)}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={activeMarker.buyerInfo.profilePicture}
                      alt="profile picture"
                      className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                    <p className="text-lg font-semibold">
                      {activeMarker.buyerInfo.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activeMarker.buyerInfo.email}
                    </p>
                    <p className="text-md text-gray-800">
                      Product Price: {order.estimatedValue} €
                    </p>
                    <p className="text-md text-gray-800">
                      Proposed delivery fee: {order.initialDeliveryFee} €
                    </p>
                    <p className="text-md text-gray-800">
                      Pickup Location:{" "}
                      {order.preferredPickupPlace.formatted_address}
                    </p>
                    <Link
                      href={`/negotiate?recipientId=${order.buyerId}&orderId=${order._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </>
  );
}
