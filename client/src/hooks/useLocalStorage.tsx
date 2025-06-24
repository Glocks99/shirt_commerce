import { useEffect, useState } from "react";

// Get saved data from localStorage or return the initial value
function getSavedData<T>(key: string, initialValue: T | (() => T)): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error reading localStorage key:", key, error);
  }

  return typeof initialValue === "function"
    ? (initialValue as () => T)()
    : initialValue;
}

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => getSavedData(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
