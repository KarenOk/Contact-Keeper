import React, { useState } from 'react';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { email, password } = form;

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log("Logged in");
    };

    return (
        <div className="form-container">
            <h1> Account <span className="text-primary">Login</span> </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input type="email" name="email" id="email" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" id="password" onChange={onChange} />
                </div>

                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
}

export default Login;
