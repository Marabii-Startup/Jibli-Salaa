import { Errors } from "@/interfaces/Errors/errors";
import { LoginFormInputs } from "./handleLoginAction";
import apiServer from "@/utils/apiServer";

export const handleLoginSubmit = async (data: LoginFormInputs) => {
  await apiServer(`${process.env.NEXT_PUBLIC_SERVERURL}/api/v1/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const getLoginForm = (formData: FormData): LoginFormInputs => {
  return {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
};

export type ValidateFormResponse = {
  isError: boolean;
  errors: Errors<LoginFormInputs>;
};

export const validateForm = ({
  email,
  password,
}: LoginFormInputs): ValidateFormResponse => {
  const errors: Errors<LoginFormInputs> = {};

  const emailRegexGrp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegexGrp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

  // Validate email
  if (!email) {
    errors.email = "Email is missing";
  } else if (!emailRegexGrp.test(email)) {
    errors.email = "Invalid email address";
  }

  // Validate password
  if (!password) {
    errors.password = "Password is missing";
  } else if (!passwordRegexGrp.test(password)) {
    errors.password =
      "Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one digit, and one special character.";
  }

  const isError = Object.keys(errors).length > 0;

  return {
    isError,
    errors,
  };
};
