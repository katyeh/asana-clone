import React from 'react';
import { useEffect, useState } from 'react';
// import { Route } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch,  } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { loadToken } from './store/actions/authentication';
import { ProtectedRoute, PrivateRoute } from "./util/route-util";

const App = ({ needLogin, loadToekn}) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(loadToken())
      .then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return null;
  };

  return (
  <BrowserRouter>
    {/* <Navigation /> */}
    <Switch>
      <ProtectedRoute
        path="/login"
        exact={true}
        needLogin={needLogin}
        component={LoginForm}
      />
      <ProtectedRoute
        path="/signup"
        exact={true}
        component={SignUpForm}
      />
      <PrivateRoute
        path="/"
        needLogin={needLogin}
        component={Home}
      />
      <Redirect to="/" />
    {/*   <Route path='/' exact={true} component={Home} />
      <Route path='/login' exact={true} component={LoginForm} />
      <Route path='/signup' exact={true} component={SignUpForm} /> */}
    </Switch>
  </BrowserRouter>
  )
};

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
