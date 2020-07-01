import React, { useReducer } from "react";
import Axios from 'axios';
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

const CONFIG = {
    'Content-Type': 'application/json'
};

const AuthProvider = (props) => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token'),
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Register User
    const register = async data => {
        try {
            const res = await Axios.post('/api/users/register', data, CONFIG);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response.status);
            console.log(err.response.data.msg);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Login User

    // Get User

    // Clear error
    const clearError = () => dispatch({ type: CLEAR_ERROR });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            register,
            clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;