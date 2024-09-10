import express from "express";
import { checkSession } from "../../middleware/checkSession.js";

const router = express.Router();

router.post("/logout", checkSession, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error destroying session');
    } else {
      return res.status(200).send({ message: "Logout" });
    }
  });
});

export default router;
