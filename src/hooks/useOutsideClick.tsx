import { useEffect, useState, RefObject } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void {
  const [wasClickedInside, setWasClickedInside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setWasClickedInside(true); // User clicked inside the element
      } else if (
        ref.current &&
        wasClickedInside &&
        !ref.current.contains(event.target as Node)
      ) {
        callback();
        setWasClickedInside(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, wasClickedInside, callback]);

  // Reset wasClickedInside when ref changes
  useEffect(() => {
    if (!ref.current) {
      setWasClickedInside(false);
    }
  }, [ref, callback]);
}
