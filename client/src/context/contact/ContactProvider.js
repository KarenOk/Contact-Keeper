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
    CONTACTS_ERROR,
    LOADING_TRUE,
    GET_CONTACTS,
    CLEAR_CONTACTS
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
        filtered: null,
        loading: false,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const getContacts = async () => {
        dispatch({ type: LOADING_TRUE });
        try {
            const res = await Axios.get("/api/contacts");

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACTS_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    const addContact = async contact => {
        dispatch({ type: LOADING_TRUE });
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

    const updateContact = async contact => {
        dispatch({ type: LOADING_TRUE });
        try {
            const res = await Axios.put(`/api/contacts/${contact._id}`, contact, CONFIG);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACTS_ERROR,
                payload: err.response.data.msg
            });
        }
    };


    const deleteContact = async id => {
        try {
            await Axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACTS_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
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
            loading: state.loading,
            current: state.current,
            filtered: state.filtered,
            getContacts,
            addContact,
            updateContact,
            deleteContact,
            clearContacts,
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