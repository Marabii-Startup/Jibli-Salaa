"use client";

import { AdditionalDataContext } from "./FormWrapper";
import { useContext } from "react";

export default function useAdditionalData() {
  const { additionalData, addAdditionalData } = useContext(
    AdditionalDataContext
  );
  return { additionalData, addAdditionalData };
}
