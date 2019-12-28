const admin = require("firebase-admin");

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  // Production setup here
} else {
  serviceAccount = require("./firebaseServiceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
