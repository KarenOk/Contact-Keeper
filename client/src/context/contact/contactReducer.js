import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "./contactTypes";


export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: state.contacts.concat(action.payload)
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                contact: null
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
        default:
            return state;
    }
};