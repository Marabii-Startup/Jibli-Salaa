"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import ISO6391 from "iso-639-1";

interface LanguageOption {
  value: string;
  label: string;
}

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  spokenLanguages: LanguageOption[];
}

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const handleRegisterSubmit: SubmitHandler<RegisterFormInputs> = async (
    data
  ) => {
    const formattedData = {
      ...data,
      spokenLanguages: data.spokenLanguages.map((language) => ({
        languageName: language.label,
        languageCode: language.value,
      })),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVERURL}/api/v1/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(formattedData),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        router.replace("/");
        router.refresh();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInClick = (): void => {
    router.push("/login");
  };

  // Prepare the language options
  const languageOptions = ISO6391.getAllCodes().map((code) => ({
    value: code,
    label: ISO6391.getName(code),
  }));
  return (
    <div className="pb-36">
      <div className="flex w-full flex-col items-center pt-20 text-center">
        <h1 className="font-playfair text-6xl font-bold">Create an account</h1>
        <p className="py-5 text-lg text-gray-400">
          Create an account and start using Jibli Salaa
        </p>
        <form
          className="w-full max-w-[550px] space-y-5 px-5"
          onSubmit={handleSubmit(handleRegisterSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-playfair text-lg font-bold"
            >
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[\p{L}\s.'-]+$/u,
                  message:
                    "Name must contain only letters, spaces, periods, apostrophes, or hyphens",
                },
              })}
              className="w-full border-2 border-black p-5"
              type="text"
              autoComplete="on"
              id="name"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-playfair text-lg font-bold"
            >
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border-2 border-black p-5"
              type="email"
              id="email"
              placeholder="Type Your Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-playfair text-lg font-bold"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/,
                  message:
                    "Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one digit, and one special character.",
                },
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              className="w-full border-2 border-black p-5"
              type="password"
              id="password"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block font-playfair text-lg font-bold"
            >
              Phone Number
            </label>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9. ()-]{7,25}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full border-2 border-black p-5"
              type="tel"
              id="phone"
              placeholder="Enter Your Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="languages"
              className="mb-2 block font-playfair text-lg font-bold"
            >
              Languages You Speak
            </label>
            <Controller
              name="spokenLanguages"
              control={control}
              rules={{ required: "At least one language is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={languageOptions}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select Languages"
                />
              )}
            />
            {errors.spokenLanguages && (
              <p className="text-red-500">{errors.spokenLanguages.message}</p>
            )}
          </div>
          <button
            className="w-full border-2 border-black bg-black py-4 font-playfair font-bold text-white transition-all duration-300 hover:bg-white hover:text-black"
            type="submit"
          >
            Sign Up
          </button>
          <p className="mt-5 w-full text-start text-gray-800">
            Already Have An Account?
            <button
              className="ml-5 border-b-2 border-black text-lg font-bold text-black"
              onClick={handleSignInClick}
            >
              Sign-In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
