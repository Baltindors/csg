// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    // Assuming your login issues { id, email } in the payload
    req.user = { id: payload.id };
    next();
  });
}

module.exports = { authenticateToken };
