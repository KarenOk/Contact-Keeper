import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactProvider from "./context/contact/ContactProvider";

ReactDOM.render(

  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

