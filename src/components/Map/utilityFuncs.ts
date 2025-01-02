import { AddressObject } from "@/interfaces/Map/AddressObject";

// Utility function to validate the marker object
export function isValidMarker(
  marker: google.maps.places.PlaceResult | undefined
) {
  if (!marker || !marker.geometry || !marker.geometry.location) {
    return false;
  }

  const { lat, lng } = marker.geometry.location;
  const isValidLat =
    typeof lat === "number" ||
    (typeof lat === "function" && typeof lat() === "number");
  const isValidLng =
    typeof lng === "number" ||
    (typeof lng === "function" && typeof lng() === "number");

  return isValidLat && isValidLng && !!marker.formatted_address;
}

// Update location
export function updateTravelerLocation(
  place: google.maps.places.PlaceResult,
  setSelectedLocation: (location: AddressObject) => void,
  setCurrentMarker: (currMarker: google.maps.places.PlaceResult) => void,
  onLocationSelect: (selectedLocation: AddressObject) => void
) {
  if (!place?.geometry?.location) {
    console.error("Invalid place object:", place);
    return;
  }

  const { geometry } = place;
  const location = {
    formatted_address: place.formatted_address!,
    lat: geometry.location?.lat()!,
    lng: geometry.location?.lng()!,
  };

  setSelectedLocation(location);
  onLocationSelect(location);
  setCurrentMarker(place);
}
