import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../context/auth/authContext";
import { useContactContext } from "../../context/contact/contactContext";


function Navbar({ title, icon }) {
    const { isAuthenticated, user, logout } = useAuthContext();
    const { clearContacts } = useContactContext();

    const onLogout = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <>
            <li> <Link to="/" > Home</Link></li>
            <li onClick={onLogout}>
                <a href="#!">
                    <i className="fas fa-sign-out-alt text-danger"></i> Logout
                </a>
            </li>
            {user && <li className="mx-2"> Welcome, {user.name} </li>}
        </>
    );

    const guestLinks = (
        <>
            <li> <Link to="/login" > Login</Link></li>
            <li> <Link to="/register" > Register</Link></li>
        </>
    );
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />  {title}
            </h1>
            <ul>
                <li> <Link to="/about" > About</Link></li>
                {isAuthenticated && authLinks}
                {!isAuthenticated && guestLinks}
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fa fa-address-book"
};

export default Navbar;
