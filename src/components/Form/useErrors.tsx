"use client";

import { AdditionalDataContext } from "./FormWrapper";
import { useContext, useState, useEffect } from "react";

export default function useErrors() {
  const { actionReturn } = useContext(AdditionalDataContext);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  //Get error messages
  useEffect(() => {
    if (actionReturn?.status === "failure" && actionReturn.errors) {
      const errors = Object.values(actionReturn.errors).filter(
        Boolean
      ) as string[];
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
    }
  }, [actionReturn]);

  return errorMessages;
}
