import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import keys from "./keys";

// Firebase config
const config = {
  apiKey: keys.firebaseApiKey,
  authDomain: keys.firebaseAuthDomain,
  databaseURL: keys.firebaseDatabaseUrl,
  projectId: keys.firebaseProjectId,
  storageBucket: keys.firebaseStorageBucket,
  messagingSenderId: keys.firebaseMessagingSenderId,
  appId: keys.firebaseAppId,
  measurementId: keys.firebaseMeasurementId,
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
