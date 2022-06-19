const mongoose = require("mongoose");

const connectDB = () => {
  const mongoURI = "mongodb://localhost:27017/ejs_crud_app";

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ database"));
};

module.exports = connectDB;
