import { Router } from "express";
import { auth } from "../middleware/middlewares.js";
const userRouter = Router();

userRouter
  .get("/login", (req, res) => {
    res.render("pages/login");
  })
  .post("/login", (req, res) => {
    req.session.user = req.body;
    res.redirect("/");
  })
  .get("/logout", auth, (req, res) => {
    res.render("pages/logout", { userLogout: req.session.user });
    req.session.destroy();
    res.clearCookie("user_sid");
  });

export default userRouter;
