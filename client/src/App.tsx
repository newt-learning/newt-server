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

// Routes in app that require authentication
const AuthRequiredSection = () => {
  const {
    state: { isFetching, exists },
  } = useAuthData();

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
    </Switch>
  );
};

// Routes in app that don't require authentication
const NoAuthRequiredSection = () => {
  return (
    <Switch>
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

const App = () => {
  const { tryLocalSignIn } = useAuthData();

  // Check if signed in already
  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <Switch>
      <Route path={["/dashboard"]} component={AuthRequiredSection} />
      <Route
        path={["/", "/login", "/discover", "/:creator"]}
        component={NoAuthRequiredSection}
      />
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
