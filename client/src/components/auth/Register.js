import React, { useState } from 'react';

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const { name, email, password, cpassword } = form;

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log("Registered");
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
                    <input type="password" name="password" id="password" value={password} onChange={onChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="cpassword"> Confirm Password</label>
                    <input type="password" name="cpassword" id="cpassword" value={cpassword} onChange={onChange} required />
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
}

export default Register;
