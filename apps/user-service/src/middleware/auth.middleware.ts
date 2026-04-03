import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/keyclock";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token)
    const user = await verifyToken(token);
    
    (req as any).user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};