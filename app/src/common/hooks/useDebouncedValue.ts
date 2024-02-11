import { useEffect, useState } from "react";

/**
 *
 * @param value
 * @param wait - waits for x milliseconds before updating the value's state
 * @returns
 */
export function useDebouncedValue<V = unknown>(value: V, wait: number = 4000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value, wait]);

  return debouncedValue;
}
