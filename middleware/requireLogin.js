const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization").replace("Bearer ", "");

  let decodedToken;
  try {
    // Verify token
    decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
  } catch (error) {
    res.status(401).send({ error: error });
  }

  next();
};
