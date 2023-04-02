import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePasswords = (pwd, hash) => {
  return bcrypt.compare(pwd, hash);
};

export const hashPassword = (pwd) => bcrypt.hash(pwd, 5);

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not a valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "not a valid token" });
    return;
  }
};
