"use server";

import { ActionReturn } from "@/interfaces/Form/Form";
import {
  getLoginForm,
  handleLoginSubmit,
  validateForm,
  ValidateFormResponse,
} from "./helperFunctions";
import { revalidatePath } from "next/cache";

export interface LoginFormInputs {
  email?: string;
  password?: string;
}

export async function handleLoginAction(
  actionReturn: ActionReturn<LoginFormInputs>,
  formData: FormData
): Promise<ActionReturn<LoginFormInputs>> {
  const loginForm: LoginFormInputs = getLoginForm(formData);
  const result: ValidateFormResponse = validateForm(loginForm);

  if (result.isError) {
    return {
      status: "failure",
      errors: result.errors,
      data: loginForm,
    };
  }

  try {
    await handleLoginSubmit(loginForm);
    revalidatePath("/");
    return { status: "success", data: loginForm };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error);
      return {
        status: "failure",
        errors: { global: error.message },
        data: loginForm,
      };
    } else {
      console.error("An unknown error occurred.");
      return {
        status: "failure",
        errors: { global: "An unknown error occurred." },
        data: loginForm,
      };
    }
  }
}
