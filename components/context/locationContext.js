import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  
  
  return (
    <UserContext.Provider
      value={{
        address,
        location,
        setAddress,
        setLocation
      }}
    >
      {children}
    </UserContext.Provider>
  );
};