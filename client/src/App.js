import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useAuthContext } from "./context/auth/authContext";
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

setAuthToken(localStorage.token);

const App = () => {
  const { loadUser } = useAuthContext();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;
