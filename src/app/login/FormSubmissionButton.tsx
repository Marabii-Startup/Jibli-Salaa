"use client";

import usePending from "@/components/Form/usePending";
import SubmitButton from "@/components/SubmitButton";

export default function FormSubmissionButton() {
  const pending = usePending();

  return (
    <div className="mt-6 flex items-center">
      <SubmitButton pending={pending} />
    </div>
  );
}
