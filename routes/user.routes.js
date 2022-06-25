const router = require("express").Router();
const User = require("../controllers/user.controllers");
const Middleware = require("../middleware/middleware");

router.get("/register", Middleware.flash, Middleware.protected_2, User.form);
router.post("/register", Middleware.flash, User.register);

router.get("/login", Middleware.flash, Middleware.protected_2, User.form);
router.post("/login", Middleware.flash, User.login);

router.get("/profile/:name", Middleware.flash, User.profile);

module.exports = router;
