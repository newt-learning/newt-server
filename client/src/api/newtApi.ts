import axios from "axios";
import firebase from "../config/firebase";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(
  async (config) => {
    // Get current user token
    const token = await firebase.auth().currentUser?.getIdToken(true);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
