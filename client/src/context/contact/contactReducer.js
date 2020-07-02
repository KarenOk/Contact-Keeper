import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACTS_ERROR,
    LOADING_TRUE
} from "./contactTypes";


export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: state.contacts.concat(action.payload),
                loading: false
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                current: null,
                filtered: null,
                error: null
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    let regex = new RegExp(action.payload, 'gi');

                    return contact.name.match(regex) ||
                        contact.email.match(regex) ||
                        contact.phone.match(regex) ||
                        contact.type.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case CONTACTS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};