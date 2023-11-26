import express from "express";
import bcrypt from "bcrypt";
import prisma from "../api/lib/index.js";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { authenticate } from "../api/middleware/middleware.js";
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

// create new owner -POST
router.post("/signup", async (req, res, next) => {
  const { name, email, password, profileImage, restaurantName} = req.body;
  try {
    const isexisting = await prisma.owner.findUnique({
      where: {
        email: email,
      },
    });

    if (isexisting) {
      return res.status(409).json({
        message: "owner is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = await prisma.owner.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profileImage,
        restaurantName
      },
    });

    return res.status(201).json({
      message: "owner creation successfully",
      owner: newOwner,
    });
  } catch (err) {
    next(err);
  }
});

// login existing owner -POST
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isexistingowner = await prisma.owner.findUnique({
      where: {
        email,
      },
    });

    if (!isexistingowner) {
      res.status(404).json({
        message: "owner was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistingowner.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = Jwt.sign(
      { id: isexistingowner.id, email: isexistingowner.email },
      SECRET_KEY,
      { expiresIn: "3h" }
    );
    return res.status(201).json({
      message: "owner logedin successfully",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

// update existing owner - PUT
router.put("/update", authenticate, async (req, res, next) => {
  const ownerId = req.owner.id;
  const { name, email, password, profileImage , restaurantName} = req.body;

  try {
    const updatedowner = await prisma.owner.update({
      where: { id: ownerId },
      data: {
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        profileImage,
        restaurantName
      },
    });

    return res.status(200).json({
      message: "owner information updated successfully",
      owner: updatedowner,
    });
  } catch (err) {
    next(err);
  }
});

// get current owner - GET
router.get("/curentowner", authenticate, async (req, res, next) => {
  const ownerId = req.owner.id;

  try {
    const owner = await prisma.owner.findUnique({
      where: { id: ownerId },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        restaurantName: true
      },
    });

    if (!owner) {
      return res.status(404).json({
        message: "owner not found",
      });
    }

    return res.status(200).json({
      message: "owner information retrieved successfully",
      owner,
    });
  } catch (err) {
    next(err);
  }
});

// get all owners - GET
router.get("/", async (req, res, next) => {
  try {
    const owners = await prisma.owner.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        restaurantName: true
      },
    });

    return res.status(200).json({
      message: "owners list retrieved successfully",
      owners,
    });
  } catch (err) {
    next(err);
  }
});

// delete existing owner - DELETE
router.delete("/delete", authenticate, async (req, res, next) => {
  const ownerId = req.owner.id;

  try {
    const deleteowner = await prisma.owner.delete({
      where: { id: ownerId },
    });

    if (!deleteowner) {
      return res.status(404).json({
        message: "owner was not found",
      });
    }

    return res.status(200).json({
      message: "owner deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
