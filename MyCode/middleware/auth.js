import jwt from "jsonwebtoken";
import config from "config";

export default function (req, res, next) {
  // get token from header
const token = req.headers["x-access-token"] || req.headers["authorization"] ;
// if no token, return response. don't proceed to NEXT middleware
  if (!token) return res.status(401).send("Access denied.  No token provided.")

  try {
    req.user = jwt.verify(token, config.get("AVENAGRATIS_SECRET_KEY"));
    next();
  } catch(e) {
    res.status(400).send("Invalid token");
  }
};