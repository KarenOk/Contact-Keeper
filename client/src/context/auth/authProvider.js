import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    AUTH_ERROR,
    CLEAR_ERROR
} from "./authTypes";

const AuthProvider = (props) => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token'),
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;