import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type CartType = {
  id: string;
  quantity: number;
};

type ContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cart: CartType[];
  setCart: Dispatch<SetStateAction<CartType[]>>;
};

// ✅ Capitalized context name
export const AppContextProvider = createContext<ContextType | null>(null);

// ✅ Custom hook to access context
export function useAppContext() {
  const context = useContext(AppContextProvider);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext");
  }
  return context;
}

// ✅ Main provider component
const AppContext = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Typed useLocalStorage
  const [cart, setCart] = useLocalStorage<CartType[]>("cart", []);

  return (
    <AppContextProvider.Provider value={{ isOpen, setIsOpen, cart, setCart }}>
      {children}
    </AppContextProvider.Provider>
  );
};

export default AppContext;
