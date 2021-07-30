const mailgun = require("mailgun-js");
var db = require("../config/connection");
const jwttoken = require("../helpers/tokenHelper");

const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});
var data = {
  from: "Mailgun Sandbox <postmaster@sandbox2d6a4bb2acdd4f97a6d2b85d7766f4ec.mailgun.org>",
  to: "",
  subject: "Verification Mail",
  text: "Testing some Mailgun awesomness!",
};

module.exports = {
  sendVerificationMail: async (toMail, host) => {
    data.to = toMail;
    var token = await jwttoken.generateTocken(toMail);
    if (token) {
      console.log("Generated Token");
    }
    var link = "http://" + host + "/users/verify/" + token;
    data.text = "HI Rafi, this is your verification link " + link;
    console.log("im adding this otp into database before sending email");
    console.log("Sending Email");
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  },
};
