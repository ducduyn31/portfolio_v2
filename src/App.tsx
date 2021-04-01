import React from 'react';
import './App.css';
import {AppProvider} from './contexts/app.context';
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import {MyRoute} from "./interfaces/MyRoute";
import {routes} from "./routes/app.routing";
import Header from "./components/header/Header";
import Floater from './components/floating_button/Floater';
import PageSettings from './components/page_settings/PageSettings';

function RouteWithSubRoutes(route: MyRoute) {
    return (
        <Route
            path={route.path}
            render={props =>
                <route.component {...props} routes={route.routes}/>
            }
        />
    )
}


function App() {
    return (
        <AppProvider>
            <Router>
                <Header/>
                <Floater>
                    <PageSettings/>
                </Floater>
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route}/>
                    ))}
                    <Redirect to={'home'}/>
                </Switch>
            </Router>
        </AppProvider>
    );
}

export default App;
