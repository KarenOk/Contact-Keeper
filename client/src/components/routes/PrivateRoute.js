import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth/authContext";

function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated, loading } = useAuthContext();

    if (!isAuthenticated && !loading) return <Redirect to="/login" />;

    return <Route component={Component} {...rest} />;
}

export default PrivateRoute;
