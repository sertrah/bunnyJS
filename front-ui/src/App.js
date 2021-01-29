import React, { Suspense, useMemo } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import routes from "application/routes";
import { AppLayout, Loader } from "application/components";
import { ROUTER_PATH_LIST } from "application/constants";
import { NotificationProvider, ConfirmationProvider } from "application/contexts";

function App() {
  const menuItems = useMemo(
    () => [
      {
        title: "Home",
        path: ROUTER_PATH_LIST.userList,
      }
    ],
    []
  );

  return (
    <NotificationProvider>
      <ConfirmationProvider>
      <Router basename="/">
        <AppLayout menu={menuItems}>
          <Suspense fallback={<Loader />}>
            <Switch>
              {routes.map(({ component: Component, ...rest }) => (
                <Route
                  {...rest}
                  key={rest.path}
                  render={props => (
                    <Component {...props} />
                  )}
                  exact
                />
              ))}
              <Redirect from="*" to="/not-found" />
            </Switch>
          </Suspense>
        </AppLayout>
      </Router>
      </ConfirmationProvider>
    </NotificationProvider>
  );
}

export default App;