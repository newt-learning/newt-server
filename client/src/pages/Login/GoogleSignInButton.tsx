import React from "react";
import { useHistory } from "react-router-dom";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { Button } from "../../components";
// Styling
import styles from "./Login.module.css";
import googleLogo from "../../assets/logos/googleLoginLogo";

interface GoogleSignInButtonProps {
  redirectTo: string; // Where to redirect after signing in
}

const GoogleSignInButton = ({ redirectTo }: GoogleSignInButtonProps) => {
  const { authenticateWithGoogle } = useAuthData();
  const history = useHistory();

  return (
    <Button
      className={`${styles.loginBtn} ${styles.googleBtn}`}
      onClick={() => authenticateWithGoogle(history, redirectTo)}
    >
      <div className={styles.btnContent}>
        {googleLogo}
        <div style={{ marginRight: "1.5rem" }}>Sign In With Google</div>
      </div>
    </Button>
  );
};

GoogleSignInButton.defaultProps = {
  redirectTo: "/dashboard",
};

export default GoogleSignInButton;
