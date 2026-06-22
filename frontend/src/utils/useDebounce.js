// CLEAN CODE RATIONALE:
// Creating a reusable useDebounce utility hook isolates the timer effect logic,
// allowing any search field in the project to avoid excessive state recalculations on every keystroke.
import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
