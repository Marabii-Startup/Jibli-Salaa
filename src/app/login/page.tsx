"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { handleLoginAction } from "./Utilis/handleLoginAction";
import Input from "@/components/Input";
import FormWrapper from "@/components/Form/FormWrapper";
import useErrors from "@/components/Form/useErrors";
import SubmitButton from "@/components/SubmitButton";
import usePending from "@/components/Form/usePending";

export default function Login() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const errorMessages = useErrors();
  const pending = usePending();
  console.log(pending);

  return (
    <div className="mt-20 pb-36">
      <div className="text-center flex w-full flex-col items-center pt-20">
        <h1 className="font-playfair text-6xl font-bold">Login</h1>
        <p className="py-5 text-lg text-gray-400">
          Please fill your email and password to login
        </p>
        <FormWrapper
          action={handleLoginAction}
          redirectTo={redirectTo}
          className="w-full max-w-[550px] space-y-5 px-5"
        >
          <div>
            <label
              className="mb-2 block font-playfair text-lg font-bold"
              htmlFor="email"
            >
              Email Address
            </label>
            <Input
              className="w-full border-2 border-black p-5"
              type="email"
              name="email"
              label="Type Your Email"
              required
              pattern={String(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
              )}
              errorMessage="Invalid email address"
            />
          </div>
          <div>
            <label
              className="mb-2 block font-playfair text-lg font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <Input
              className="w-full border-2 border-black p-5"
              type="password"
              name="password"
              label="Enter Your Password"
              required
              pattern={String(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/
              )}
              errorMessage="Password must be at least 8 characters long, and include one uppercase letter, one lowercase letter, one digit, and one special character."
            />
          </div>
          <div className="flex flex-col gap-3">
            <SubmitButton pending={pending} />
            <Link
              href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_SERVERURL}/google/callback&response_type=code&client_id=1028629889843-gjkff6ielpualsk4cu1700vbp08ggacj.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline`}
            >
              <button
                className="w-full border-2 border-black bg-black py-4 font-playfair font-bold text-white transition-all duration-300 hover:bg-white hover:text-black"
                type="submit"
              >
                Sign In With Google
              </button>
            </Link>
          </div>
          <p className="mt-5 w-full text-start text-gray-800">
            Don&apos;t Have An Account?{" "}
            <Link
              href="/register"
              className="ml-5 border-b-2 border-black text-lg font-bold text-black"
            >
              Register
            </Link>
          </p>
        </FormWrapper>
      </div>
    </div>
  );
}
