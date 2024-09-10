export function checkSession(req, res, next) {
    if (req.session.username) {
      next();
    } else {
      res.status(401).json({ error: "Not authenticated" });
    }
  }
  