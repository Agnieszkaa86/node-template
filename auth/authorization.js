const passport = require("passport");

const authorization = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
       message: "Unauthorized",
      });
    }
     if(!user.verify) {
      return res.status(401).json({
       message: "Email not verified",
      });
  }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authorization;