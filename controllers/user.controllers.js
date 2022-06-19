const UserModel = require("../models/user.models");

class User {
  static form(req, res) {
    res.render(`pages/${req.url.replace("/", "")}`);
  }

  static create(req, res) {
    const user = req.body;

    User.check("register", user, function (isValid, status, message) {
      if (!isValid) {
        req.flash("error", message.error);
        return res.status(status).redirect("/register");
      }

      UserModel.create(user, function (isValid, status, message) {
        if (!isValid) {
          req.flash("error", message.error);
          return res.status(status).redirect("/register");
        }
        req.flash("success", message.success);
        return res.status(status).redirect("/login");
      });
    });
  }

  static login(req, res) {
    const user = req.body;

    User.check("login", user, function (isValid, status, message) {
      if (!isValid) {
        req.flash("error", message.error);
        return res.status(status).redirect("/login");
      }
      UserModel.find(user, function (isValid, status, message) {
        if (!isValid) {
          req.flash("error", message.error);
          return res.status(status).redirect("/login");
        }
        req.flash("success", message.success);
        req.session.isAuth = true;

        return res.status(status).redirect("/login");
      });
    });
  }

  /**
   * Check if form is valid
   * @param {string} type register or login
   * @param {object} form form data
   * @param {function} callback
   * @returns true or false & err msg
   */
  static check(type, form, callback) {
    if (type === "register") {
      if (!form.username) {
        return callback(false, 401, { error: "Username is required" });
      }
      if (form.username.length < 3) {
        return callback(false, 401, {
          error: "Username must be grater than 3",
        });
      }
      if (!form.email) {
        return callback(false, 401, { error: "Email is required" });
      }
      if (!form.password || !form.confirmPassword) {
        return callback(false, 401, { error: "Password is required" });
      }
      if (form.password !== form.confirmPassword) {
        return callback(false, 401, { error: "Passwords are not the same" });
      }
      if (form.password.length < 5) {
        return callback(false, 401, {
          error: "Password must be grater than 5",
        });
      }
      if (!form.check) {
        return callback(false, 401, {
          error: "You need to agree the terms and conditions",
        });
      }
    }
    if (type === "login") {
      if (!form.username) {
        return callback(false, 401, { error: "Username is required" });
      }
      if (form.username.length < 3) {
        return callback(false, 401, {
          error: "Username must be grater than 3",
        });
      }
      if (!form.password) {
        return callback(false, 401, { error: "Password is required" });
      }
      if (form.password.length < 5) {
        return callback(false, 401, {
          error: "Password must be grater than 5",
        });
      }
    }
    return callback(true);
  }
}

module.exports = User;
