import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// Context
import {
  Provider as AuthProvider,
  Context as AuthContext,
  useData as useAuthData,
} from "./context/AuthContext";
// Pages
import { LandingPage, LoginPage, DiscoverPage, ContentPage } from "./pages";

const App = () => {
  const {
    state: { isFetching, exists },
    tryLocalSignIn,
  } = useAuthData();

  useEffect(() => {
    tryLocalSignIn();
  }, []);

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
