import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERROR,
    LOADING_TRUE
} from "./authTypes";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return ({
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            });
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                token: null,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};