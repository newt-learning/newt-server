// This is the portion of the site that has to do with the web -- requires
// authentication (so not Landing page or other public parts of the site)
import React from "react";
import { Switch } from "react-router-dom";
// Context
import { useData as useAuthData } from "./context/AuthContext";
// Components
import { PrivateRoute, Sidebar, AppNavbar } from "./components";
// Pages
import { Dashboard } from "./pages";
// Styling
import styles from "./NewtWebApp.module.css";

const NewtWebApp = () => {
  const {
    state: { isFetching, exists },
  } = useAuthData();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.appContainer}>
      <Sidebar />
      <section className={styles.pageContainer}>
        <AppNavbar />
        <Switch>
          <PrivateRoute
            Component={Dashboard}
            authExists={exists}
            path="/dashboard"
          />
        </Switch>
      </section>
    </section>
  );
};

export default NewtWebApp;
