import React from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useContactContext } from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
function Contacts() {
    const { contacts, filtered } = useContactContext();

    if (!contacts.length) return <h3 className="text-dark"> Please add contacts. </h3>;
    return (
        <div>
            <TransitionGroup>

                {filtered ?
                    filtered.map(contact =>
                        <CSSTransition key={contact._id} timeout={500} classNames="fade" >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ) :
                    contacts.map(contact =>
                        <CSSTransition key={contact._id} timeout={500} classNames="fade" >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </div>
    );
}

export default Contacts;
