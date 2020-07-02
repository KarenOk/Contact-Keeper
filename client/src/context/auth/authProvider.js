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
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERROR,
    LOADING_TRUE
} from "./authTypes";
import setAuthToken from "../../utils/setAuthToken";

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

    // Load User
    const loadUser = async () => {
        dispatch({ type: LOADING_TRUE });
        setAuthToken(localStorage.token);

        try {
            const res = await Axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register User
    const register = async data => {
        dispatch({ type: LOADING_TRUE });
        try {
            const res = await Axios.post('/api/users/register', data, CONFIG);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Login User
    const login = async data => {
        dispatch({ type: LOADING_TRUE });
        try {
            const res = await Axios.post('/api/auth', data, CONFIG);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }
    };

    // Clear error
    const clearError = () => dispatch({ type: CLEAR_ERROR });

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            register,
            login,
            logout,
            clearError,
            loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;