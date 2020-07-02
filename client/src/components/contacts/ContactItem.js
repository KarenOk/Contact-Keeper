import React from 'react';
import PropTypes from 'prop-types';
import { useContactContext } from "../../context/contact/contactContext";

function ContactItem({ contact }) {
    const { _id, name, email, phone, type } = contact;
    const { deleteContact, setCurrent, clearCurrent } = useContactContext();
    const badgeMap = {
        personal: "badge-primary",
        landline: "badge-success",
        professional: "badge-danger",
    };

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    };
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}
                <span
                    style={{ float: "right" }}
                    className={"badge " + badgeMap[type]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email &&
                    <li>
                        <i className="fas fa-envelope-open"></i> {email}
                    </li>
                }
                {phone &&
                    <li>
                        <i className="fas fa-phone"></i> {phone}
                    </li>
                }
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
