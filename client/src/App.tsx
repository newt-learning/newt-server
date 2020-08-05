import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// Pages
import { LandingPage, LoginPage, DiscoverPage, ContentPage } from "./pages";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true} placement="bottom-center">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/discover" component={DiscoverPage} />
          <Route
            path="/:creator/content/:contentNameSlug"
            component={ContentPage}
          />
          <Route path="/" component={LandingPage} />
        </Switch>
      </ToastProvider>
    </Router>
  );
}

export default App;
