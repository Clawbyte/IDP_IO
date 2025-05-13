import { Request, Response, NextFunction } from "express";
import axios from "axios";

interface AuthenticatedRequest extends Request {
  user?: any;
  headers: {
    authorization?: string;
    [key: string]: any;
  };
}

const ioUrl = process.env.AUTH_URL || "http://localhost:3001"

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  await axios.get(ioUrl + "/verify/" + token)
    .then((response) => {
      if (response.status !== 200) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = response.data.username;
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      return res.status(500).json({ message: "Internal server error" });
    });
  next();
};
