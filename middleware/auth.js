const jwt = require("jsonwebtoken");
const SECRET = "mon_secret_token"; // même que plus haut

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
}

module.exports = authMiddleware;
