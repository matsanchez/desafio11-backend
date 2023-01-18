import { Router } from "express";
import { auth } from "../middleware/middlewares.js";
const userRoutes = Router();

userRoutes
  .get("/login", auth, (req, res) => {
    res.render("pages/login");
  })
  .post("/login", (req, res) => {
    req.session.user = req.body;
    res.redirect("/");
  })
  .get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/");
  });

export default userRoutes;
