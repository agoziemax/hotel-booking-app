import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import api from "../api";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery("validateToken", api.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};

// without typescript

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const showToast = (toastMessage) => {
//     // Implementation for showing a toast message
//     console.log(`Showing toast message: ${toastMessage.message}`);
//   };

//   const contextValue = {
//     showToast,
//   };

//   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   return context;
// };
