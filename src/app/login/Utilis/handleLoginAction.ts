"use server";

import { ActionReturn } from "@/interfaces/Form/Form";
import {
  getLoginForm,
  handleLoginSubmit,
  validateForm,
  ValidateFormResponse,
} from "./helperFunctions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface LoginFormInputs {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
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
    const loginResponse = await handleLoginSubmit(loginForm);
    const IS_PRODUCTION = process.env.IS_PRODUCTION === "true";

    // Parse and validate COOKIES_MAX_AGE
    let cookiesMaxAge = parseInt(process.env.COOKIES_MAX_AGE || "3600", 10);
    if (isNaN(cookiesMaxAge)) {
      console.warn("Invalid COOKIES_MAX_AGE. Defaulting to 3600 seconds.");
      cookiesMaxAge = 3600;
    }

    // Determine sameSite based on environment
    const sameSiteValue = IS_PRODUCTION ? "none" : "lax";

    // Set the cookie
    (await cookies()).set({
      name: "jwtToken",
      value: loginResponse.token,
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: sameSiteValue,
      path: "/",
      maxAge: cookiesMaxAge,
    });

    // Revalidate the path to reflect the updated state
    revalidatePath("/");
    return { status: "success", data: loginForm };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        status: "failure",
        errors: { global: error.message },
        data: loginForm,
      };
    } else {
      return {
        status: "failure",
        errors: { global: "An unknown error occurred." },
        data: loginForm,
      };
    }
  }
}
