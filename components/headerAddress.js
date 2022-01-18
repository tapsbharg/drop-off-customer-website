import React, { createContext } from 'react'
const AddressContext = createContext({a:'demo'})
export const AddressProvider = AddressContext.Provider
export default AddressContext