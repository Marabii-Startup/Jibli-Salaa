import apiServer from "@/utils/apiServer";
import { Suspense } from "react";
import { AddressObject } from "@/interfaces/Map/AddressObject";
import MapForTravelers from "./components/mapForTravelers";
import Tetromino from "@/components/Loading/Tetromino/Tetromino";
import { CompletedOrder } from "@/interfaces/Order/order";

interface SearchParams {
  countryStart: string;
  countryEnd: string;
  latStart: string;
  lngStart: string;
  latEnd: string;
  lngEnd: string;
}

export default async function AcceptOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { countryStart, latStart, lngStart, countryEnd, latEnd, lngEnd } =
    await searchParams;
  const result: CompletedOrder[] = await apiServer(
    `/api/protected/getOrders?countries_params=${countryStart} ${countryEnd}`
  );
  const route: {
    departureLocation: Omit<AddressObject, "formatted_address">;
    destinationLocation: Omit<AddressObject, "formatted_address">;
  } = {
    departureLocation: {
      lat: parseFloat(latStart), // Latitude
      lng: parseFloat(lngStart), // Longitude
    },
    destinationLocation: {
      lat: parseFloat(latEnd), // Latitude
      lng: parseFloat(lngEnd), // Longitude
    },
  };

  return (
    <Suspense
      fallback={
        <div className="bg-black w-[500px] h-[500px] text-white text-3xl">
          <Tetromino />
        </div>
      }
    >
      <MapForTravelers route={route} orders={result} />
    </Suspense>
  );
}
