import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// Pages
import {
  LandingPage,
  DiscoverPage,
  ContentPage,
  PlaylistPage,
  SeriesPage,
  AboutPage,
} from "./pages";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true} placement="bottom-center">
        <Switch>
          <Route path="/discover" component={DiscoverPage} />
          <Route path={["/about", "/story"]} component={AboutPage} />
          <Route
            path="/:creator/content/:contentNameSlug"
            component={ContentPage}
          />
          <Route path="/:creator/series/:seriesSlug" component={SeriesPage} />
          <Route
            path="/:creator/playlists/:playlistSlug"
            component={PlaylistPage}
          />
          <Route path="/" component={LandingPage} />
        </Switch>
      </ToastProvider>
    </Router>
  );
}

export default App;
