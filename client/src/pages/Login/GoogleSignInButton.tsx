import React from "react";
import { useHistory } from "react-router-dom";
import classnames from "classnames/bind";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { Button } from "../../components";
// Styling
import styles from "./Login.module.css";
import googleLogo from "../../assets/logos/googleLoginLogo";

const cx = classnames.bind(styles);

interface GoogleSignInButtonProps {
  redirectTo: string; // Where to redirect after signing in
  callback?: () => void; // Optional callback after signing in
  className?: string;
}

const GoogleSignInButton = ({
  redirectTo,
  callback,
  className,
}: GoogleSignInButtonProps) => {
  const { authenticateWithGoogle } = useAuthData();
  const history = useHistory();

  const signIn = async () => {
    await authenticateWithGoogle(history, redirectTo, callback);
  };

  return (
    <Button
      className={cx(styles.loginBtn, styles.googleBtn, className)}
      onClick={signIn}
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
