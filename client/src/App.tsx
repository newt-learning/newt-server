import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// Context
import {
  Provider as AuthProvider,
  useData as useAuthData,
} from "./context/AuthContext";
import { Provider as SidebarProvider } from "./context/SidebarContext";
// Section
import NewtWebApp from "./NewtWebApp";
// Pages
import { LandingPage, LoginPage, DiscoverPage, ContentPage } from "./pages";

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
      <Route
        path={["/dashboard", "/shelves", "/topics", "/profile"]}
        component={NewtWebApp}
      />
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
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};
