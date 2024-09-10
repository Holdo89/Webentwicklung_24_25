import express from "express";
import { checkSession } from "../../middleware/checkSession.js";

const router = express.Router();

router.get("/privatearea", checkSession, (req, res) => {
  const username = req.session.username;
  res.json({ message: "Session info", username: username });
});

export default router;