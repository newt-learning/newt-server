// This is the portion of the site that has to do with the web app -- requires
// authentication (so not Landing page or other public parts of the site)
import React from "react";
import { Switch } from "react-router-dom";
// Context
import { useData as useAuthData } from "./context/AuthContext";
import { useData as useSidebar } from "./context/SidebarContext";
// Components
import {
  PrivateRoute,
  Sidebar,
  AppNavbar,
  AppMainContainer,
} from "./components";
import SyncLoader from "react-spinners/SyncLoader";
// Pages
import {
  Dashboard,
  ProfilePage,
  UserPlaylistsPage,
  IndividualUserPlaylistPage,
  ShelvesPage,
  IndividualShelfPage,
  AddContentPage,
  StatsPage,
} from "./pages";
// Styling
import styles from "./NewtWebApp.module.css";

const NewtWebApp = () => {
  const {
    state: { isFetching, exists },
  } = useAuthData();

  const {
    state: { isCollapsed },
  } = useSidebar();

  return (
    <section className={styles.appContainer}>
      <Sidebar />
      <section
        className={
          isCollapsed
            ? `${styles.pageContainer} ${styles.collapsed}`
            : `${styles.pageContainer} ${styles.expanded}`
        }
      >
        <AppNavbar />
        {isFetching ? (
          <AppMainContainer className={styles.loadingContainer}>
            <SyncLoader size={18} color="#38ceff" />
          </AppMainContainer>
        ) : (
          <Switch>
            <PrivateRoute
              Component={Dashboard}
              authExists={exists}
              path="/dashboard"
            />
            <PrivateRoute
              Component={AddContentPage}
              authExists={exists}
              path="/add-content"
            />
            <PrivateRoute
              Component={IndividualShelfPage}
              authExists={exists}
              path="/shelves/:shelfName"
            />
            <PrivateRoute
              Component={ShelvesPage}
              authExists={exists}
              path="/shelves"
            />
            <PrivateRoute
              Component={IndividualUserPlaylistPage}
              authExists={exists}
              path="/playlists/:playlistId"
            />
            <PrivateRoute
              Component={UserPlaylistsPage}
              authExists={exists}
              path="/playlists"
            />
            <PrivateRoute
              Component={StatsPage}
              authExists={exists}
              path="/stats"
            />
            <PrivateRoute
              Component={ProfilePage}
              authExists={exists}
              path="/profile"
            />
          </Switch>
        )}
      </section>
    </section>
  );
};

export default NewtWebApp;
