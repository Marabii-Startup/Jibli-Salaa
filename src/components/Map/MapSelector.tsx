"use client";
import { APIProvider, MapMouseEvent } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import {
  ControlPosition,
  MapControl,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { isValidMarker, updateTravelerLocation } from "./utilityFuncs";
import { AddressObject } from "@/interfaces/Map/AddressObject";
import { LocationSearch } from "./MapSearch";

export default function MapSelector({
  onLocationSelect,
}: {
  onLocationSelect: (selectedLocation: AddressObject) => void;
}) {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  const [currentMarker, setCurrentMarker] =
    useState<google.maps.places.PlaceResult>();
  const [selectedLocation, setSelectedLocation] = useState<AddressObject>({
    formatted_address: "",
    lat: null,
    lng: null,
  });

  // Check if the client is ready
  useEffect(() => {
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return null;
  }

  // Handle map click to set a marker and update location
  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (!latLng) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const place = {
          formatted_address: results[0].formatted_address,
          geometry: {
            location: new google.maps.LatLng(latLng.lat, latLng.lng),
          },
        };

        updateTravelerLocation(
          place,
          setSelectedLocation,
          setCurrentMarker,
          onLocationSelect
        );
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

  // Remove marker on click
  const handleMarkerClick = () => setCurrentMarker(undefined);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GoogleMaps_API ?? ""}>
      <Map
        mapId={process.env.NEXT_PUBLIC_GoogleMaps_MAPID}
        defaultZoom={2}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling="greedy"
        style={{
          height: "100vh",
          width: "100vw",
          maxWidth: "500px",
          maxHeight: "500px",
        }}
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        {isValidMarker(currentMarker) &&
          currentMarker &&
          currentMarker.geometry?.location && (
            <AdvancedMarker
              key={currentMarker.formatted_address}
              position={currentMarker.geometry.location}
              onClick={handleMarkerClick}
            />
          )}
      </Map>
      <MapControl position={ControlPosition.TOP}>
        <LocationSearch
          onPlaceSelect={(place: google.maps.places.PlaceResult): void => {
            if (
              place.geometry &&
              place.geometry.location &&
              place.formatted_address
            ) {
              updateTravelerLocation(
                place,
                setSelectedLocation,
                setCurrentMarker,
                onLocationSelect
              );
            } else {
              console.error("Invalid place object:", place);
              return;
            }
          }}
          currentMarker={currentMarker}
        />
      </MapControl>
      <MapManager selectedLocation={selectedLocation} />
    </APIProvider>
  );
}

// Component to manage map state and effects
const MapManager = ({
  selectedLocation,
}: {
  selectedLocation: AddressObject;
}) => {
  const mapInstance = useMap();

  useEffect(() => {
    if (!mapInstance || !selectedLocation) return;
    if (selectedLocation.lat === null || selectedLocation.lng === null) return;
    mapInstance.panTo(
      new google.maps.LatLng(selectedLocation.lat, selectedLocation.lng)
    );
    mapInstance.setZoom(15); // Zoom in on the selected location
  }, [mapInstance, selectedLocation]);

  return null;
};
