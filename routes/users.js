import express from "express";
import bcrypt from "bcrypt";
import prisma from "../api/lib/index.js";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { userVerify } from "../api/middleware/middleware.js";
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

// create new user -POST
router.post("/signup", async (req, res, next) => {
  const { name, email, password, profileImage } = req.body;
  try {
    const isexisting = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isexisting) {
      return res.status(409).json({
        message: "user is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profileImage,
      },
    });

    return res.status(201).json({
      message: "user creation successfully",
      user: newuser,
    });
  } catch (err) {
    next(err);
  }
});

// login existing user -POST
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isexistinguser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isexistinguser) {
      res.status(404).json({
        message: "user was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistinguser.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = Jwt.sign(
      { id: isexistinguser.id, email: isexistinguser.email },
      SECRET_KEY,
      { expiresIn: "3h" }
    );
    return res.status(201).json({
      message: "user logedin successfully",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

// update existing user - PUT
router.put("/update", userVerify, async (req, res, next) => {
  const userId = req.user.id;
  const { name, email, password, profileImage } = req.body;

  try {
    const updateduser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        profileImage,
      },
    });


    return res.status(200).json({
      message: "user information updated successfully",
      user: updateduser,
    });
  } catch (err) {
    next(err);
  }
});

// get current user - GET
router.get("/curentUser", userVerify, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "user information retrieved successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});

// get all users - GET
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
      },
    });

    return res.status(200).json({
      message: "users list retrieved successfully",
      users,
    });
  } catch (err) {
    next(err);
  }
});

// delete existing user - DELETE
router.delete("/delete", userVerify, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const deleteuser = await prisma.user.delete({
      where: { id: userId },
    });

    if (!deleteuser) {
      return res.status(404).json({
        message: "user was not found",
      });
    }

    return res.status(200).json({
      message: "user deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

export default router;

// https://food-delivery-application-backend.onrender.com/api/user/update