import { Request, Response, Router } from "express";
import { signInSchema, signUpSchema } from "@repo/schemas";
import { compare, hash } from "bcryptjs";
import prisma from "@repo/db/client";
import { sign } from "jsonwebtoken";
import  { JWT_SECRET } from "@repo/common";

export const userRouter: Router = Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedBody = signUpSchema.safeParse(req.body);

      if (!parsedBody.success) {
        res.status(400).json({
          message: "Invalid Inputs",
          error: parsedBody.error.format(),
        });
        return;
      }

      const { username, password, email } = parsedBody.data;

      const isUserWithSameNameOrEmailExists = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if(isUserWithSameNameOrEmailExists) {
        res.status(401).json({
          message : "User with same name or email already exists"
        })
        return;
      }

      const hashedPassword = await hash(password, 10);

      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        message: "User Account Successfully Created",
      });

      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedBody = signInSchema.safeParse(req.body);

      if (!parsedBody.success) {
        res.status(400).json({
          message: "Invalid Inputs",
          error: parsedBody.error.format(),
        });
        return;
      }

      const { username, password } = parsedBody.data;

      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        res.status(401).json({
          message: "No User Found with this username",
        });
        return;
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          message: "Incorrect Password",
        });
        return;
      }

      const token = sign({ userId: user.id }, JWT_SECRET ?? "");

      res.status(200).json({
        message: "Login Successfull",
        token,
      });

      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }
  }
);
