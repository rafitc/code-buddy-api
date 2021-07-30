const jwt = require("jsonwebtoken");
var db = require("../config/connection");

module.exports = {
  generateTocken: async (email) => {
    const token = await jwt.sign({ ID: email }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  },

  verifyToken: async (token) => {
    console.log("Got token");
    await jwt.verify(
      token,
      process.env.TOKEN_KEY,
      async function (err, decoded) {
        if (err) {
          console.log(err);
          return false;
        }
        let email = await jwt.decode(token);
        email = email.ID;
        console.log("EMail : " + email);
        console.log("identified user : " + email);
        if (email) {
          console.log(email + " User verified ");
          console.log("upating database");
          const updateResult = await db
            .get()
            .collection("code")
            .updateOne({ Email: email }, { $set: { verification: "true" } });
          if (updateResult) {
            console.log("User verified fied updated");
            return "true";
          } else {
            console.log("failed to update");
            return "false";
          }
        }
      }
    );
  },
};
