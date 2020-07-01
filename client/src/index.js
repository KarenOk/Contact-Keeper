import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactProvider from "./context/contact/ContactProvider";
import AuthProvider from "./context/auth/authProvider";
import AlertProvider from "./context/alert/alertProvider";

ReactDOM.render(

  <React.StrictMode>
    <AuthProvider>
      <ContactProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ContactProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

