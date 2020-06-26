import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "./contactTypes";

function ContactProvider(props) {
    const initialState = {
        contacts: [{
            id: 1,
            name: "Karen Okonkwo",
            email: "karenokonkwo29@gmail.com",
            phone: "+2348131033508",
            type: "personal",
        }, {
            id: 2,
            name: "Chuka Okonkwo",
            email: "chukaokonkwo29@gmail.com",
            phone: "+2348131033508",
            type: "professional",
        }, {
            id: 3,
            name: "Neme Okonkwo",
            email: "nemeokonkwo29@gmail.com",
            phone: "+2348131033508",
            type: "landline",
        }],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };


    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    const filterContacts = query => {
        dispatch({ type: FILTER_CONTACTS, payload: query });
    };

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            updateContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactProvider;