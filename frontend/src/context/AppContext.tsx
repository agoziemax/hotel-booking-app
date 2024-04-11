import { createContext, useContext } from "react";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          console.log(toastMessage);
        },
      }}
    >
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
