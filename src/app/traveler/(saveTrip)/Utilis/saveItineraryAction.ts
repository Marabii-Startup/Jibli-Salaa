"use server";

import { Itinerary } from "@/interfaces/Traveler/Traveler";
import { getItineraryDetails, handleSubmit } from "./helperfunctions";
import validateForm, { ValidateFormResponse } from "./validateForm";
import { Errors } from "@/interfaces/Errors/errors";
import { revalidatePath } from "next/cache";

export async function saveItinerary(
  state: State,
  formData: FormData
): Promise<State> {
  const itineraryDetails: Itinerary = getItineraryDetails(formData);
  const result: ValidateFormResponse = validateForm(itineraryDetails);
  if (result.isError) {
    return { status: "failure", errors: result.errors };
  }

  try {
    await handleSubmit(itineraryDetails);
    revalidatePath("/");
    return { status: "success" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error);
      return { status: "failure", errors: { global: error.message } };
    } else {
      console.error("An unknown error occurred.");
      return {
        status: "failure",
        errors: { global: "An unknown error occurred." },
      };
    }
  }
}

export type State = {
  status: "success" | "failure";
  errors?: Errors<Itinerary>;
} | null;
