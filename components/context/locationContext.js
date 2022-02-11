import React, { createContext, useEffect, useState } from "react";
import apiFunc from "../../services/api";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  const [profile, setProfile] = useState({});
  
  
  return (
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};