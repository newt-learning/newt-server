import React from "react";
import { useHistory, useLocation } from "react-router-dom";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { Navbar, Button } from "../../components";
// Styling
import styles from "./Login.module.css";
import googleLogo from "../../assets/logos/googleLoginLogo";
// import githubLogo from "../../assets/logos/GitHubLoginLogo.png";

const LoginPage = () => {
  const { authenticateWithGoogle } = useAuthData();
  const history = useHistory();
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
                <Button
                  className={`${styles.loginBtn} ${styles.googleBtn}`}
                  onClick={() => authenticateWithGoogle(history, redirectTo)}
                >
                  <div className={styles.btnContent}>
                    {googleLogo}
                    <div style={{ marginRight: "1.5rem" }}>
                      Sign In With Google
                    </div>
                  </div>
                </Button>
              </li>
              {/* <li>
                <Button
                  className={`${styles.loginBtn} ${styles.githubBtn}`}
                  // onClick={() => authenticateWithGithub(history)}
                >
                  <div className={styles.btnContent}>
                    <img
                      alt="github-logo"
                      src={githubLogo}
                      className={styles.logo}
                    />
                    <div style={{ marginRight: "1.5rem" }}>
                      Sign In With GitHub
                    </div>
                  </div>
                </Button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
