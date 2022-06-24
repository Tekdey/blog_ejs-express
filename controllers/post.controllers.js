const PostModel = require("../models/post.models");

/**
 * Post controllers
 */
class Post {
  /**
   * Controller thats _check if post is valid if it is he call the datamapper else return error message
   * @param request
   * @param response
   * @returns error or success message and redirect user
   */
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
    PostModel._check(post, function (isValid, status, message) {
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
  /**
   * Home page controller
   * @param request
   * @param response
   * @returns render the ejs template as all posts
   */
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
}

module.exports = Post;
