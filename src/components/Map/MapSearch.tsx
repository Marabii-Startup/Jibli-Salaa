import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect } from "react";
import { isValidMarker } from "./utilityFuncs";

// Autocomplete search component for location input
export function LocationSearch({
  onPlaceSelect,
  currentMarker,
}: {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  currentMarker: google.maps.places.PlaceResult | undefined;
}) {
  const [autocompleteInstance, setAutocompleteInstance] =
    useState<google.maps.places.Autocomplete>();
  const inputElement = useRef<HTMLInputElement>(null);
  const placesLibrary = useMapsLibrary("places");

  useEffect(() => {
    if (isValidMarker(currentMarker) && currentMarker && inputElement.current) {
      inputElement.current.value = currentMarker.formatted_address || "";
    }
  }, [currentMarker]);

  // Initialize autocomplete on mount
  useEffect(() => {
    if (!placesLibrary || !inputElement.current) return;

    const options = {
      fields: ["geometry", "formatted_address"],
    };

    setAutocompleteInstance(
      new placesLibrary.Autocomplete(inputElement.current, options)
    );
  }, [placesLibrary]);

  // Handle place selection
  useEffect(() => {
    if (!autocompleteInstance) return;

    autocompleteInstance.addListener("place_changed", () => {
      const selectedPlace = autocompleteInstance.getPlace();
      onPlaceSelect(selectedPlace);
    });
  }, [onPlaceSelect, autocompleteInstance]);

  return (
    <div className="autocomplete-container">
      <input
        className="p-2 left-2 relative top-2"
        ref={inputElement}
        placeholder="Search a place"
        required
      />
    </div>
  );
}
