import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// Context
import {
  Provider as AuthProvider,
  useData as useAuthData,
} from "./context/AuthContext";
// Components
import { PrivateRoute } from "./components";
// Pages
import {
  LandingPage,
  LoginPage,
  DiscoverPage,
  ContentPage,
  Dashboard,
} from "./pages";

const App = () => {
  const {
    state: { isFetching, exists },
    tryLocalSignIn,
  } = useAuthData();

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <PrivateRoute
        Component={Dashboard}
        authExists={exists}
        path="/dashboard"
      />
      <Route path="/login" component={LoginPage} />
      <Route path="/discover" component={DiscoverPage} />
      <Route
        path="/:creator/content/:contentNameSlug"
        component={ContentPage}
      />
      <Route path="/" component={LandingPage} />
    </Switch>
  );
};

export default () => {
  return (
    <Router>
      <ToastProvider autoDismiss={true} placement="bottom-center">
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};
