class Middleware {
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
  static protected_1(req, res, next) {
    if (!req.session.isAuth) {
      return res.send("unauthorized");
    }
    res.send("Hello");
  }
}

module.exports = Middleware;
