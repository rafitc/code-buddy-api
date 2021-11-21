var express = require("express");
var router = express.Router();
var authHelper = require("../helpers/auth-helper");
/* GET home page. */

router.use("/", (req, res, next) => {
  console.log("GOT REQ, running auth fn");
  const a = Promise.resolve(authHelper.isAuthenticated(req, res));
  a.then(
    () => {
      console.log("Doneee");
      next();
    },
    (err) => {
      console.log(err);
      return res.status(401).json({
        statusCode: 401,
        message: "Your not a user",
      });
    }
  );
});

router.get("/", function (req, res, next) {
  console.log("reached here");
  res.render("index", { title: "Express" });
  res.send("Index page");
});

module.exports = router;

//Auth module, Pending the user authentication callback err
