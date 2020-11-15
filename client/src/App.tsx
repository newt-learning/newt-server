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
import {
  LandingPage,
  DiscoverPage,
  ContentPage,
  NewtPlaylistPage,
  SeriesPage,
  LoginPage,
} from "./pages";

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
      <Route path="/:creator/series/:seriesSlug" component={SeriesPage} />
      <Route
        path="/:creator/playlists/:playlistSlug"
        component={NewtPlaylistPage}
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
        path={[
          "/dashboard",
          "/add-content",
          "/shelves",
          "/playlists",
          "/stats",
          "/profile",
        ]}
        component={NewtWebApp}
      />
      <Route
        path={[
          "/",
          "/login",
          "/discover",
          "/:creator/content/:contentNameSlug",
          "/:creator/series/:seriesSlug",
          "/:creator/playlists/:playlistSlug",
        ]}
        component={NoAuthRequiredSection}
      />
    </Switch>
  );
};

export default () => {
  return (
    <Router>
      <ToastProvider
        autoDismiss={true}
        autoDismissTimeout={3000}
        placement="bottom-center"
      >
        <AuthProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};
