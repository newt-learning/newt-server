import React from "react";
import { useLocation } from "react-router-dom";
// Components
import { Navbar } from "../../components";
import GoogleSignInButton from "./GoogleSignInButton";
// Styling
import styles from "./Login.module.css";

const LoginPage = () => {
  // Destructuring from state throws type error, so setting as any
  const location: any = useLocation();

  // If there's a redirect path in state, use that. Otherwise default redirect
  // after login is to Dashboard
  const redirectTo = location.state?.redirectTo?.pathname || "/dashboard";

  return (
    <section>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.panel}>
          <h3 className={styles.panelHeader}>Sign in</h3>
          <div className={styles.panelBody}>
            <ul>
              <li className={styles.providerBtn}>
                <GoogleSignInButton redirectTo={redirectTo} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
