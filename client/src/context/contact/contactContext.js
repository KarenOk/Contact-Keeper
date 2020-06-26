import { createContext, useContext } from "react";

const contactContext = createContext();

export default contactContext;
export const useContactContext = () => useContext(contactContext);