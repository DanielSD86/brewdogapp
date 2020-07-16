import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { isAuthenticed } from "./services/auth";

import { Login, Logout } from "./pages/login";
import Mercadorias from "./pages/mercadorias";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticed()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
);

const Rotas = () => (    
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute exact path="/" component={Mercadorias} />
        </Switch>
    </BrowserRouter>
);

export default Rotas;