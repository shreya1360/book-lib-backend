import jwt from "jsonwebtoken";
import config from "../jwtConfig.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);

    // Attach full user object or just ID to request
    req.user = { id: decoded.id }; // <-- this matches your controller usage (req.user.id)

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export default authMiddleware;
