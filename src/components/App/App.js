import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as ROUTES from "../util/Routing";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import EditGroup from "../Pages/EditGroup";
import Files from "../Pages/Files";
import useAuth from "../../auth/use-auth";

export default function App() {
  const context = useAuth();
  const routes = context.user;

  return (
    <div className="is-fluid is-fullwidth">
      <link
        href="https://fonts.googleapis.com/css?family=Lato&display=swap"
        rel="stylesheet"
      />
      <Router>
        <Header />
        <Switch>
          {routes ? (
            <Route
              exact
              path={ROUTES.HOME.PATH}
              component={ROUTES.DASHBOARD.COMPONENT}
            />
          ) : (
            <>
              <Route
                exact
                path={ROUTES.HOME.PATH}
                component={ROUTES.HOME.COMPONENT}
              />
            </>
          )}
          {routes ? (
            <>
              <Route
                path={ROUTES.EDIT_PROFILE.PATH}
                component={ROUTES.EDIT_PROFILE.COMPONENT}
              />
              <Route
                path={ROUTES.VIEW_ALL_USERS.PATH}
                component={ROUTES.VIEW_ALL_USERS.COMPONENT}
              />
              <Route path="/editgroup/:id" children={<EditGroup />} />
              <Route path="/files/:path" children={<Files />} />
            </>
          ) : (
            <>
              <p>Access Denied</p>
            </>
          )}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
