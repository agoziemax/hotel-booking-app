import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
  ],

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
        sameSite: "strict",
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;

// Ensure the user provided an email and password
// const [emailValidationRule, passwordValidationRule] = [
//   check('email').isEmail().withMessage('Must provide a valid email address'),
//   check('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
// ];

// // Validate the request body
// const validate = (req: Request, res: Response, next: Function) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// // Export authenticate user function
// export const authenticateUser = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     // Use the validations and validate middleware
//     emailValidationRule(req);
//     passwordValidationRule(req);
//     validate(req, res, async () => {
//       // Find the user with the provided email
//       const user = await User.findOne({ email: req.body.email });

//       if (!user) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }

//       // Verify password
//       const isMatch = await user.comparePassword(req.body.password);

//       if (!isMatch) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }

//       // Create a JWT token
//       const token = jwt.sign(
//         { userId: user._id, email: user.email },
//         process.env.SECRET,
//         {
//           expiresIn: '1h',
//         },
//       );

//       return res.status(200).json({ message: 'Authentication successful', token });
//     });
//   } catch (err) {
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// };
