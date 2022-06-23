require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const { connectDB, mongoURI } = require("./db/db.config");

const PORT = process.env.PORT || 5000;
const store = new MongoDBSession({
  uri: mongoURI,
  collection: "user_sessions",
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 86_4e5 },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/user.routes"));
app.use(require("./routes/post.routes"));

connectDB();
app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}/`));
