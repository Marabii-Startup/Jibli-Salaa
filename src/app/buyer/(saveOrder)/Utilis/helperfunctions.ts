import { AddressObject } from "@/interfaces/Map/AddressObject";
import { InitialOrder, Dimensions } from "@/interfaces/Order/order";
import apiServer from "@/utils/apiServer";

export function getInitialOrderDetails(data: FormData): InitialOrder {
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
  const {
    description,
    estimatedValue,
    initialDeliveryFee,
    deliveryInstructions,
    productName,
    dimensions,
    productURL,
    quantity,
    preferredPickupPlace,
    selectedFiles,
  } = result;

  return {
    description: description as string,
    estimatedValue: parseFloat(estimatedValue),
    initialDeliveryFee: parseFloat(initialDeliveryFee),
    deliveryInstructions: deliveryInstructions as string | null,
    productName: productName as string,
    dimensions: dimensions as Dimensions,
    productURL: productURL as string | null,
    quantity: parseInt(quantity, 10),
    preferredPickupPlace: preferredPickupPlace as AddressObject,
    selectedFiles:
      typeof selectedFiles === "object"
        ? [selectedFiles]
        : (selectedFiles as File[]),
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

export async function handleSubmit(initialOrderDetails: InitialOrder) {
  const data = new FormData();

  // Append form fields excluding 'images'
  Object.keys(initialOrderDetails).forEach((key) => {
    if (key === "selectedFiles") {
      return; // Skip 'images'
    }

    if (key === "dimensions" || key === "preferredPickupPlace") {
      data.append(
        key,
        JSON.stringify(
          initialOrderDetails[key as keyof typeof initialOrderDetails]
        )
      );
    } else {
      data.append(
        key,
        String(initialOrderDetails[key as keyof typeof initialOrderDetails])
      );
    }
  });

  // Append images
  initialOrderDetails.selectedFiles.forEach((file) => {
    data.append("images", file);
  });

  try {
    await apiServer("/api/protected/postOrder", {
      method: "POST",
      body: data,
      headers: {},
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
