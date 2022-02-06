const { async } = require("jshint/src/prod-params");
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.BD_CNN ,
      {}
    );
    console.log("Connection successful");
  } catch (error) {
    console.error(error);
    throw new Error("Error trying to connect");
  }
};

module.exports = {
    dbConnection
}