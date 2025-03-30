import { createContext } from "react";
import { doctors } from '../assets/assets'; // Importing doctors data

// Create AppContext
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = '$'; // Define any other values to be shared through context

  // Define the value passed through context
  const value = {
    doctors,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {children} {/* Render child components here */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
