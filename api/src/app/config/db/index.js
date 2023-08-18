const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/nodejs_express_first")
      .then(() => console.log("Connected!"));
  } catch (error) {
    console.log("Connect faild");
  }
};

module.exports = { connect };
