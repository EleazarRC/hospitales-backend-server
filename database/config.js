const { async } = require("jshint/src/prod-params");
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL ,
      {
        useUnifiedTopology:true,
        useNewUrlParser: true,
        /* useCreateIndex: true */
      }
    );
    console.log("Connection successful");
  } catch (error) {
    console.error(error);
    throw new Error("Error trying to connect");
  }
};

module.exports = {
    dbConnection
};