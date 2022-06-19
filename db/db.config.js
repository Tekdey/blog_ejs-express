const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/ejs_crud_app";

const connectDB = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ database"));
};

module.exports = { connectDB, mongoURI };
