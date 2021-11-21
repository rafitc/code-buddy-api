const { NotExtended } = require("http-errors");
const jwt = require("jsonwebtoken");
const userHelper = require("../helpers/user-helper");
module.exports = {
  authTokenGenerate: (email) => {
    const token = jwt.sign({ ID: email }, process.env.PUBLIC_TOKEN_KEY, {
      expiresIn: "7d",
    });
    console.log(token);
    return token;
  },
  isAuthenticated: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) res.send("no token");
    console.log(token);
    console.log("Checking user authentication");
    await jwt.verify(
      token,
      process.env.PUBLIC_TOKEN_KEY,
      async (err, decoded) => {
        if (err) console.log(err);
        let email = await jwt.decode(token).ID;
        console.log(email);
        const userCheck = await userHelper.isUser(email);
        // console.log("userCheck" + userCheck);
        if (userCheck) {
          console.log("yessss");
          return "user";
        } else {
          return false;
        }
      }
    );
  },
};
