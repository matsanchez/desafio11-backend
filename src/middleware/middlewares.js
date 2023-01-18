export const auth = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    const user_sid = req.session.user;
    res.render("pages/home", { user: user_sid });
  } else {
    next();
  }
};
