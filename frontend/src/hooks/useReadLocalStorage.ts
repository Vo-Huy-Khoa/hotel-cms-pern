import { useCallback, useEffect, useState } from "react";

type Value<T> = T | null;
export function useReadLocalStorage<T>(key: string): Value<T> {
  const readValue = useCallback((): Value<T> => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key]);
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);
  useEffect(() => {
    setStoredValue(readValue());
  }, []);
  return storedValue;
}
export default useReadLocalStorage;

// how to use
// import { useReadLocalStorage } from "usehooks-ts";

// export default function Component() {
//   // Assuming a value was set in localStorage with this key
//   const darkMode = useReadLocalStorage("darkMode");

//   return <p>DarkMode is {darkMode ? "enabled" : "disabled"}</p>;
// }
