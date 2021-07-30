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
    // console.log(filteredDocs);
    // if (filteredDocs === null) {
    //   console.log("found documents =>", filteredDocs);
    //   return true;
    // } else {
    //   console.log("No data");
    //   return false;
    // }
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
};
