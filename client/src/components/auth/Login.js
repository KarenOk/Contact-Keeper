import React, { useState } from 'react';
import { useAlertContext } from "../../context/alert/alertContext";

function Login() {
    const { setAlert } = useAlertContext();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { email, password } = form;

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!email || !password) setAlert("All fields are required", "danger");
        else setAlert("Login successful", "success");;

        console.log("Logged in");
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

                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
}

export default Login;
