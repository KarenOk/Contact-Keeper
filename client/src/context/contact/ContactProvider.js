import React, { useReducer } from "react";
import Axios from "axios";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACTS_ERROR
} from "./contactTypes";

const CONFIG = {
    headers: {
        'Content-Type': "application/json"
    }
};

function ContactProvider(props) {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = async contact => {
        try {
            const res = await Axios.post('/api/contacts', contact, CONFIG);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACTS_ERROR,
                payload: err.response.data.msg
            });
        }
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