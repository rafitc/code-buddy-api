var express = require("express");
var router = express.Router();
var userHelper = require("../helpers/user-helper");
var mailGun = require("../helpers/mail-helper.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hi");
});

router.post("/", async function (req, res) {
  let email = req.body.email;
  email = email.toLowerCase();
  var host = req.get("host");
  const userCondition = await userHelper.isUser(email);
  console.log("hh :" + userCondition);
  if (userCondition === "not a user") {
    console.log("lets call addUser");
    const addUserConditon = await userHelper.addUser(email);
    console.log("condtiond : " + addUserConditon);
    if (addUserConditon === "inserted") {
      console.log("heyy u just completed reg\n next i wanna verify it");
      //verificatoin email
      const mailStatus = await mailGun.sendVerificationMail(email, host);
      console.log(mailStatus);
    }
    res.send("Added user");
  } else if (userCondition === "user") {
    console.log("lets call return an error");
    res.send("err");
  }
});

router.get("/verify/:token", async (req, res) => {
  // var h = req.protocol + "://" + req.get("host");
  // var host = req.get("host");
  const token = req.params.token;
  console.log("Received here token");
  if (!token) {
    return "err";
  }
  var verification = await userHelper.checkEmailVerification(token);
  if (verification === "done") {
    console.log(" Verified user");
    res.send("Verified!!");
  } else {
    console.log("err");
    res.send("not verified ");
  }
});
module.exports = router;
