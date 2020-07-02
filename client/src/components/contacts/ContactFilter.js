import React, { useRef } from 'react';
import { useContactContext } from "../../context/contact/contactContext";

function ContactFilter() {
    const ref = useRef('');
    const { contacts, clearFilter, filterContacts } = useContactContext();

    const onChange = e => {
        if (ref.current.value === '') clearFilter();
        else filterContacts(e.target.value);
    };

    if (!contacts.length) return <div className="m-3" />;

    return (
        <form>
            <input type="text" ref={ref} onChange={onChange} placeholder="Filter Contacts" />
        </form>
    );
}

export default ContactFilter;
