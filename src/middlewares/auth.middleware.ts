import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole, DecodedToken } from "../interface/user.interface";

export const authenticateJWT = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided or invalid format" });
      return;
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "secret") as DecodedToken;

      (req as any).user = decoded;

      if (roles.length && (!decoded.role || !roles.includes(decoded.role))) {
        res.status(403).json({ message: "Insufficient permissions" });
        return;
      }

      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};
