import React from "react";
import { useLocation } from "react-router-dom";
import { useData as useAuthData } from "../../context/AuthContext";
import GoogleSignInButton from "../../pages/Login/GoogleSignInButton";
import styles from "./AddToLibrary.module.css";

const AddToLibrary = () => {
  const {
    state: { exists },
  } = useAuthData();

  const location = useLocation();

  return (
    <div className={styles.container}>
      {exists ? (
        "Add to lib form"
      ) : (
        <>
          <h5>You need to sign in to add this to your Library</h5>
          <GoogleSignInButton redirectTo={location.pathname} />
        </>
      )}
    </div>
  );
};

export default AddToLibrary;
