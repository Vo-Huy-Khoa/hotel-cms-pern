import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader?.split(" ")[1] || "";
  if (!token) {
    res.status(401).json({ message: "Token is not provided" });
  }
  try {
    const key = process.env.JWT_SECRET || "";
    let isVeriToken = jwt.verify(token, key);
    if (isVeriToken) {
      next();
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

const UpdateToken = async (req: Request, res: Response) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const { token: refreshToken, id: userId } = req.body;
  try {
    return res.status(201).json("{ token: accessToken }");
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export { authToken, UpdateToken };
