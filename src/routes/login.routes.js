import { Router } from "express";
const userRoutes = Router();

userRoutes
  .get("/login", (req, res) => {
    res.render("pages/login");
  })
  .post("/login", (req, res) => {
    req.session.user = req.body;
    res.redirect("/");
  });

export default userRoutes;
