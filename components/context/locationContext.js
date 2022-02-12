import React, { createContext, useEffect, useState } from "react";
import apiFunc from "../../services/api";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState('');
  const [profile, setProfile] = useState({});
  
  const [settings, setSetigns]=useState({})
  const [idcardCheck,setIdcardCheck]=useState(false);
  const [prescripCheck,setPrescripCheck]=useState('');
  const [couponData, setCouponData]=useState('');
  const [couponId, setCouponId]=useState('');
  const [addressId, setAddressId]=useState('');
  const [prescription,setPrescription]=useState('');
  const [orderDate, setOrderDate]=useState('');
  const [latLong, setLatLong]=useState('');
  const [totalMiles,setTotalMiles]=useState(0);
  const [cardId,setCardId]=useState('');
  
  return (
    <UserContext.Provider
      value={{
        address,
        location,
        profile,
        setAddress,
        setLocation,
        setProfile,
        settings, setSetigns,
        idcardCheck,setIdcardCheck,
        prescripCheck,setPrescripCheck,
        couponData, setCouponData,
        couponId, setCouponId,
        prescription,setPrescription,
        orderDate, setOrderDate,
        addressId, setAddressId,
        latLong, setLatLong,
        totalMiles,setTotalMiles,
        cardId,setCardId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};