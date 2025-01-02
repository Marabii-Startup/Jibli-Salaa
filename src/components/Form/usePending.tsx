"use client";

import { AdditionalDataContext } from "./FormWrapper";
import { useContext } from "react";

export default function usePending() {
  const { pending } = useContext(AdditionalDataContext);
  return pending;
}
