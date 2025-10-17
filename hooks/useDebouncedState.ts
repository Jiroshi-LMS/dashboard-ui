import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 500
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedRef = useRef<NodeJS.Timeout | null>(null);

  const setDebouncedValue: Dispatch<SetStateAction<T>> = (newValue) => {
    if (debouncedRef.current) clearTimeout(debouncedRef.current);

    debouncedRef.current = setTimeout(() => {
      setValue(
        typeof newValue === "function"
          ? (newValue as (prev: T) => T)(value)
          : newValue
      );
    }, delay);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debouncedRef.current) clearTimeout(debouncedRef.current);
    };
  }, []);

  return [value, setDebouncedValue];
}
