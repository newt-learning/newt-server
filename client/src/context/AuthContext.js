import createDataContext from "./createDataContext";
import firebase from "../config/firebase";
import newtApi from "../api/newtApi";

// Action constants
const REQUEST_SIGN_IN = "REQUEST_SIGN_IN";
const RESOLVE_SIGN_IN = "RESOLVE_SIGN_IN";
const SET_AUTHED_USER = "SET_AUTHED_USER";
const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER";

const authReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return { ...state, isFetching: true };
    case RESOLVE_SIGN_IN:
      return { ...state, isFetching: false };
    case SET_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        exists: true,
      };
    case REMOVE_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        userInfo: null,
        exists: false,
      };
    default:
      return state;
  }
};

// Actions
const requestSignIn = () => {
  return { type: REQUEST_SIGN_IN };
};
const resolveSignIn = () => {
  return { type: RESOLVE_SIGN_IN };
};
const setAuthedUser = (payload) => {
  return { type: SET_AUTHED_USER, payload };
};
const removeAuthedUser = () => {
  return { type: REMOVE_AUTHED_USER };
};

// Function to authenticate with Google
export const authenticateWithGoogle = (dispatch) => (history) => {
  // Get Google Provider
  const provider = new firebase.auth.GoogleAuthProvider();
  authenticateWithProvider(provider, history, dispatch);
};

// Function to authenticate with Google
export const authenticateWithGithub = (dispatch) => (history) => {
  // Get GitHub Provider
  const provider = new firebase.auth.GithubAuthProvider();
  authenticateWithProvider(provider, history, dispatch);
};

// General function that uses Firebase authentication service (popup)
// with a given auth provider
async function authenticateWithProvider(provider, history, dispatch) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      // Move it after pop-up sign in flow is complete so the background is
      // still the Login page (and not loading screen)
      dispatch(requestSignIn());

      const user = result.user;

      // Take only currently necessary info from user object
      const userInfo = {
        _id: user.uid,
        displayName: user.displayName,
        email: user.email,
      };

      // Request to create user if doesn't exist, or send back existing user
      // from Mongo DB
      const res = await newtApi.post("/user/create", userInfo);

      dispatch(setAuthedUser(res.data));

      // Redirect to dashboard
      history.push("/dashboard");
    })
    .catch((error) => {
      dispatch(removeAuthedUser());
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "Account with the same email already exists with a different provider." +
            "\nSign in using the provider associated with this email address."
        );
      } else {
        alert(error);
      }
    });
}

// Function to check if the user is already signed in on the device.
const tryLocalSignIn = (dispatch) => () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(requestSignIn());

      // Get user info from db
      newtApi
        .get(`/user/${user.uid}`)
        .then((res) => dispatch(setAuthedUser(res.data)))
        .catch((error) => {
          dispatch(resolveSignIn());
        });
    } else {
      dispatch(removeAuthedUser());
    }
  });
};

const signOut = (dispatch) => async () => {
  await firebase.auth().signOut();
  dispatch(removeAuthedUser());
};

export const { Provider, Context, useData } = createDataContext(
  authReducer,
  { authenticateWithGoogle, signOut, tryLocalSignIn },
  { isFetching: true, exists: false, userInfo: null }
);
