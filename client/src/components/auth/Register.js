import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../../context/auth/authContext";
import { useAlertContext } from "../../context/alert/alertContext";
import spinner from "../../components/layout/spinner.gif";

const Register = props => {
    const { register, error, clearError, isAuthenticated, loading } = useAuthContext();
    const { setAlert } = useAlertContext();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            setAlert("Registered Successfully", "success", 7000);
            props.history.push("/");
        };
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const { name, email, password, cpassword } = form;

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (cpassword !== password) setAlert("Passwords dont match", "danger");
        else register({ name, email, password });
    };

    return (
        <div className="form-container">
            <h1> Account <span className="text-primary">Register</span> </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name"> Full name </label>
                    <input type="text" name="name" id="name" value={name} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={onChange} required minLength="6" />
                </div>

                <div className="form-group">
                    <label htmlFor="cpassword"> Confirm Password</label>
                    <input type="password" name="cpassword" id="cpassword" value={cpassword} onChange={onChange} required minLength="6" />
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? <img src={spinner} style={{ width: "25px" }} alt="Loading..." /> : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Register;
