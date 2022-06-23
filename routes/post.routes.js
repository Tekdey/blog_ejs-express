const router = require("express").Router();
const Post = require("../controllers/post.controllers");
const Middleware = require("../middleware/middleware");
const upload = require("../config/multer.config");

router.get("/", Middleware.protected_1, Middleware.flash, Post.index);
router.post(
  "/api/v1/post/create",
  upload.single("image"),
  Middleware.protected_1,
  Middleware.flash,
  Post.create
);

module.exports = router;
