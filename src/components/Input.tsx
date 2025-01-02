"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useOutsideClick from "@/hooks/useOutsideClick";

interface InputProps {
  type?: string;
  name: string;
  value?: string | number;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  className?: string;
  pattern: string;
  errorMessage: string;
  isTextarea?: boolean;
  textareaHeight?: string;
  initialValue?: string | number;
  required?: boolean;
}

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  label,
  className,
  pattern,
  errorMessage,
  isTextarea = false,
  initialValue = "",
  textareaHeight = "100px",
  required = false,
  ...props
}: InputProps) {
  const regex = pattern ? new RegExp(pattern.slice(1, -1)) : null;
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState<string | number>(
    initialValue
  );

  const inputRef = useRef<HTMLDivElement>(null);

  useOutsideClick(inputRef, () => setIsFocused(false));

  useEffect(() => {
    // Sync the initialValue with the currentValue state
    setCurrentValue(initialValue);
  }, [initialValue]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;

    if (!required && newValue.trim() === "") {
      setError(null);
    } else if (regex && !regex.test(newValue)) {
      setError(errorMessage || "Invalid input.");
    } else {
      setError(null);
    }

    setCurrentValue(newValue);
    onChange && onChange(event);
  };

  return (
    <>
      <div ref={inputRef} className="relative mt-5 mb-1 w-full">
        <label
          htmlFor={name}
          className={twMerge(
            "absolute left-2 px-1 text-xs z-0 transition-all duration-300",
            isFocused || (currentValue !== null && currentValue !== "")
              ? "-top-[0.5rem] z-20 bg-white text-black"
              : "top-1/2 -translate-y-1/2 text-md text-gray-500",
            error && "text-red-500"
          )}
        >
          {label}
        </label>
        {!isTextarea ? (
          <input
            onFocus={() => setIsFocused(true)}
            type={type}
            name={name}
            value={currentValue}
            onChange={handleChange}
            required={required}
            className={twMerge(
              `${
                className ?? ""
              } border p-2 relative rounded-md z-10 bg-transparent w-full`,
              error ? "border-red-500" : "border-black"
            )}
            {...props}
          />
        ) : (
          <textarea
            onFocus={() => setIsFocused(true)}
            name={name}
            value={currentValue}
            onChange={handleChange}
            style={{ height: textareaHeight }}
            required={required}
            className={twMerge(
              `${
                className ?? ""
              } border p-2 relative rounded-md z-10 bg-transparent w-full resize-none`,
              error ? "border-red-500" : "border-black"
            )}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
}
