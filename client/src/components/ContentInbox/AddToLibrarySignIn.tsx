import React from "react";
import { useLocation } from "react-router-dom";
// Components
import GoogleSignInButton from "../../pages/Login/GoogleSignInButton";
// Styling
import styles from "./AddToLibrary.module.css";
// Types

interface AddToLibrarySignInProps {
  callback: () => void;
}

const AddToLibrarySignIn = ({ callback }: AddToLibrarySignInProps) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h5>Please sign in to add this to your Library</h5>
      <GoogleSignInButton
        redirectTo={location.pathname}
        callback={callback}
        className={styles.googleBtn}
      />
    </div>
  );
};

export default AddToLibrarySignIn;
