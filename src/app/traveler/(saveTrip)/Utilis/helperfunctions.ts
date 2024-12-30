import { AddressObject } from "@/interfaces/Map/AddressObject";
import { Itinerary } from "@/interfaces/Traveler/Traveler";
import apiServer from "@/utils/apiServer";

export function getItineraryDetails(data: FormData): Itinerary {
  const result: any = {};
  //handle the dot notation, some inputs have names like: dimensions.lengthInCm, the code
  //below will create an object by the name dimensions which a key by the name lengthInCm
  //and a value of whatever the user put in.
  data.forEach((value, key) => {
    if (key.includes(".")) {
      // Handle dot notation for nested fields
      const keys = key.split(".");
      let current = result;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          // If it's the last key, assign the value
          current[k] = parseValue(value);
        } else {
          // If it's not the last key, ensure the key exists as an object
          if (!current[k]) {
            current[k] = {};
          }
          current = current[k];
        }
      });
    } else {
      // Handle top-level keys
      result[key] = parseValue(value);
    }
  });

  // Manually cast and extract fields from result
  const { from, to, departure, arrival } = result;

  return {
    from: from as AddressObject,
    to: to as AddressObject,
    departure: new Date(departure) as Date,
    arrival: new Date(arrival) as Date,
  };
}

// Helper function to parse values
function parseValue(value: FormDataEntryValue): any {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

export async function handleSubmit(itinerary: Itinerary) {
  try {
    await apiServer("/api/protected/postTravelerTrip", {
      method: "POST",
      body: JSON.stringify(itinerary),
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
}
