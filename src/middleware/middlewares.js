export const auth = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/api/auth/login");
  } else {
    next();
  }
};
