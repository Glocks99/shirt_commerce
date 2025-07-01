import {
  createContext,
  useContext,
  useEffect,
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
  user: {
    isLoggedIn: boolean;
    userData?: Record<string, any>;
  };
  setUser: Dispatch<SetStateAction<{ isLoggedIn: boolean; userData?: Record<string, any> }>>;
  checkIsUserLoggedIn: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppContextProvider = createContext<ContextType | null>(null);

export function useAppContext() {
  const context = useContext(AppContextProvider);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext");
  }
  return context;
}

const AppContext = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ isLoggedIn: boolean; userData?: Record<string, any> }>({
    isLoggedIn: false,
    userData: undefined,
  });
  const [isLoading, setIsLoading] = useState(false)

  const [cart, setCart] = useLocalStorage<CartType[]>("cart", []);

  const checkIsUserLoggedIn = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser({
        isLoggedIn: true,
        userData: JSON.parse(userData),
      });
    } else {
      setUser({
        isLoggedIn: false,
        userData: undefined,
      });
    }
  };

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  return (
    <AppContextProvider.Provider
      value={{
        isOpen,
        setIsOpen,
        cart,
        setCart,
        user,
        setUser,
        checkIsUserLoggedIn,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AppContextProvider.Provider>
  );
};

export default AppContext;
