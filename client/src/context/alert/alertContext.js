import React, { createContext, useContext } from "react";

const alertContext = createContext();
export const useAlertContext = () => useContext(alertContext);

export default alertContext;