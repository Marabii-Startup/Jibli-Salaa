"use server";

import { InitialOrder } from "@/interfaces/Order/order";
import { getInitialOrderDetails } from "./helperfunctions";
import validateForm, { ValidateFormResponse } from "./validateForm";
import { ActionReturn } from "@/interfaces/Form/Form";
import { handleSubmit } from "@/app/buyer/(saveOrder)/Utilis/helperfunctions";
import { revalidatePath } from "next/cache";

export async function saveOrder(
  actionReturn: ActionReturn<InitialOrder>,
  formData: FormData
): Promise<ActionReturn<InitialOrder>> {
  const initialOrderDetails: InitialOrder = getInitialOrderDetails(formData);
  const result: ValidateFormResponse = validateForm(initialOrderDetails);

  if (result.isError) {
    return {
      status: "failure",
      errors: result.errors,
      data: initialOrderDetails,
    };
  }

  try {
    await handleSubmit(initialOrderDetails);
    revalidatePath("/");
    return { status: "success", data: initialOrderDetails };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error);
      return {
        status: "failure",
        errors: { global: error.message },
        data: initialOrderDetails,
      };
    } else {
      console.error("An unknown error occurred.");
      return {
        status: "failure",
        errors: { global: "An unknown error occurred." },
        data: initialOrderDetails,
      };
    }
  }
}
