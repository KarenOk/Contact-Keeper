import { createContext, useContext } from 'react';

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export default authContext;