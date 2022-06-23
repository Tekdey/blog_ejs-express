const PostModel = require("../models/post.models");

class Post {
  static create(req, res) {
    if (!req.uniqueImageName) {
      req.flash("error", "You need to upload an image");
      return res.status(406).redirect("/");
    }
    const post = {
      ...req.body,
      image: req.uniqueImageName,
      author: req.session.user.username,
    };
    Post._check(post, function (isValid, status, message) {
      if (!isValid) {
        req.flash("error", message.error);
        return res.status(status).redirect("/");
      }
      PostModel.create(post, function (isValid, status, message) {
        if (!isValid) {
          req.flash("error", message.error);
          return res.status(status).redirect("/");
        }
        req.flash("success", message.success);
        return res.status(status).redirect("/");
      });
    });
  }
  static async index(req, res) {
    const posts = await PostModel.getAllPost();
    if (typeof posts === "string") {
      req.flash("error", posts);
      return res.status(501).render("pages/index");
    }
    res.render("pages/index", {
      posts,
    });
  }
  static _check(post, callback) {
    if (post.content.length > 150) {
      return callback(false, 406, {
        error: "Message can not be greater than 150",
      });
    }
    if (post.content.trim() === "") {
      return callback(false, 406, { error: "Message can not be empty" });
    }
    return callback(true);
  }
}

module.exports = Post;
