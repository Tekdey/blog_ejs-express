require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const connectDB = require("./db/db.config");

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", require("./routes/user.routes"));

connectDB();
app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}/`));
