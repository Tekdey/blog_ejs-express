class Middleware {
  /**
   *  Middleware that displays notifications for the user
   * @param req
   * @param res
   * @param next
   */
  static flash(req, res, next) {
    if (req.session.flash) {
      res.locals.flash = req.session.flash;
      req.session.flash = undefined;
    }
    if (req.session.flash === null) {
      req.session.flash = undefined;
    }
    req.flash = function (type, content) {
      if (req.session.flash === undefined) {
        req.session.flash = {};
      }
      req.session.flash[type] = content;
    };
    next();
  }
  /**
   * Middleware that protect a route against a none authenticated users
   * @param req
   * @param res
   * @param next
   * @returns
   */
  static protected_1(req, res, next) {
    if (!req.session.isAuth) {
      return res.status(301).redirect("/login");
    }
    next();
  }
  static protected_2(req, res, next) {
    if (req.session.isAuth) {
      return res.status(301).redirect("/");
    }
    next();
  }
}

module.exports = Middleware;
