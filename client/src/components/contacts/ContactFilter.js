import React, { useRef, useEffect } from 'react';
import { useContactContext } from "../../context/contact/contactContext";

function ContactFilter() {
    const ref = useRef('');
    const { contacts, filtered, clearFilter, filterContacts } = useContactContext();

    useEffect(() => {
        if (!filtered) ref.current.value = '';
    }, [filtered]);

    const onChange = e => {
        if (ref.current.value === '') clearFilter();
        else filterContacts(ref.current.value);
    };

    if (!contacts.length) return <div className="m-3" />;

    return (
        <form>
            <input type="text" ref={ref} onChange={onChange} placeholder="Filter Contacts" />
        </form>
    );
}

export default ContactFilter;
