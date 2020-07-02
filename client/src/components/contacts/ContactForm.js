import React, { useState, useEffect } from 'react';
import { useContactContext } from "../../context/contact/contactContext";

function ContactForm() {
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
        type: 'personal'
    });

    const { name, type, email, phone } = contact;
    const { addContact, updateContact, current, clearCurrent } = useContactContext();

    useEffect(() => {
        if (current) setContact(current);
        else setContact({
            name: '',
            phone: '',
            email: '',
            type: 'personal'
        });
    }, [current]);

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current) updateContact(contact);
        else addContact(contact);

        setContact({
            name: '',
            phone: '',
            email: '',
            type: 'personal'
        });

        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h3 className="text-primary">
                {current ? "Update Existing Contact" : "Add New Contact"}
            </h3>
            <label>
                Name
                <input type="text" name="name" value={name} placeholder="Jane Doe" onChange={onChange} required />
            </label>

            <label>
                Email
                <input type="email" name="email" value={email} placeholder="janedoe@gmail.com" onChange={onChange} />

            </label>
            <label>
                Phone Number
                <input type="text" name="phone" value={phone} placeholder="+234814433453" onChange={onChange} />
            </label>

            <h5> Type</h5>

            <label>
                Personal
            <input type="radio" className="mx-1" name="type" value="personal" checked={type === "personal"} onChange={onChange} />
            </label>
            <label>
                Professional
                <input type="radio" className="mx-1" name="type" value="professional" checked={type === "professional"} onChange={onChange} />
            </label>
            <label>
                Landline
                <input type="radio" className="mx-1" name="type" value="landline" checked={type === "landline"} onChange={onChange} />
            </label>

            <div>
                <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value={current ? "Update Contact" : "Add Contact"}
                />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" type="button" onClick={clearAll}> CLEAR ALL </button>
            </div>}
        </form>
    );
}

export default ContactForm;
