import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../Config/config";

const verifyToken = (req: any, res: any, next: any): void => {
  const authHeader = req.header('Authorization');
  console.log(typeof authHeader)
  const token = String(authHeader).split(' ')[1];
  console.log(token)

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (typeof decoded === "object" && "user" in decoded) {
      req.user = (decoded as JwtPayload).user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid authorization token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

export default verifyToken;
