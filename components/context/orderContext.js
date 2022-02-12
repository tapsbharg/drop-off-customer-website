import React, { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

// This context provider is passed to any component requiring the context
/* export const OrderProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  const [profile, setProfile] = useState({});
  console.log(children)
  
  return (
    <OrderContext.Provider
      value={{
        address,
        location,
        profile,
        setAddress,
        setLocation,
        setProfile
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}; */