export const auth = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render("pages/home");
  } else {
    next();
  }
};
