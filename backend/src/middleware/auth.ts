import { NextFunction, Request, Response } from "express";

const verifyToken = (req: Request, res: Response, nextFunction: NextFunction)=>{
const token = req.cookies["auth_token"];
if (!token) {
  return res.status(401).json({message: "Unauthorized"})
}

try {

} catch (error) {
 return res.status(401).json({ message: "Unauthorized" });
}

}