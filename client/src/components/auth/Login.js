import React, { useState, useEffect } from 'react';
import { useAlertContext } from "../../context/alert/alertContext";
import { useAuthContext } from "../../context/auth/authContext";
import spinner from "../../components/layout/spinner.gif";

const Login = props => {
    const { setAlert } = useAlertContext();
    const { login, loading, error, isAuthenticated, clearError } = useAuthContext();

    useEffect(() => {
        if (isAuthenticated) {
            setAlert("Login successful", "success", 7000);
            props.history.push("/");
        }
        if (error) {
            setAlert(error, 'danger');
            clearError();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const { email, password } = form;

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!email || !password) setAlert("All fields are required", "danger");
        else login({ email, password });
    };

    return (
        <div className="form-container">
            <h1> Account <span className="text-primary">Login</span> </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" id="password" value={password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? <img src={spinner} style={{ width: "25px" }} alt="Loading..." /> : "Login"}
                </button>

            </form>
        </div>
    );
};

export default Login;
