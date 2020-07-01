import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactProvider from "./context/contact/ContactProvider";
import AuthProvider from "./context/auth/authProvider";

ReactDOM.render(

  <React.StrictMode>
    <AuthProvider>
      <ContactProvider>
        <App />
      </ContactProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

