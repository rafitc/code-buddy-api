var db = require("../config/connection");
const jwttoken = require("../helpers/tokenHelper");

module.exports = {
  isUser: async (details) => {
    var member = { Email: details };
    const filteredDocs = await db
      .get()
      .collection("code")
      .find(member)
      .toArray();
    if (filteredDocs[0] === undefined) {
      console.log("its null");
      return "not a user";
    } else {
      console.log("its not null");
      return "user";
    }
  },
  addUser: async (email) => {
    var member = { Email: email, verification: "false" };
    const insertResult = await db.get().collection("code").insertOne(member);
    console.log(" Data Inserted!" + insertResult);
    return "inserted";
  },
  checkEmailVerification: async (token) => {
    const v = await jwttoken.verifyToken(token);
    console.log("v:" + v);
  },
  addUserDetails: async (email, fName, lName) => {
    const result = await db
      .get()
      .collection("code")
      .updateOne({ Email: email }, { $set: { Fname: fName, Lname: lName } });
    if (result) {
      console.log("Updated succesfully");
      return true;
    } else {
      console.log("Got some Error");
      console.log(result);
      return "err";
    }
  },
};
