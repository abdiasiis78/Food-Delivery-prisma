import express from "express";
import prisma from "../api/lib/index.js";
import "dotenv/config";
import { authenticate } from "../api/middleware/middleware.js";
import e from "express";
const router = express();

//  CREATE NEW FOODMENU - POST
router.post("/", authenticate, async (req, res, next) => {
  const { title, description, price, menuImage, dietaryInfo } = req.body;

  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        title: title,
        description: description,
        price: price,
        dietaryInfo: dietaryInfo,
        menuImage: menuImage,
      },
    });
    return res.status(201).json({
      message: "menuItem created successfully",
      menuItem: newMenuItem,
    });
  } catch (err) {
    next(err)
  }
});

// UPDATE EXISTING FOODMENU - PUT
router.put("/:id", authenticate, async (req, res, next) => {
  const foodId = parseInt(req.params.id);
  const { title, description, price, menuImage, dietaryInfo } = req.body;
  try {
    const updateMenuItem = await prisma.menuItem.update({
      where: { id: foodId },
      data: {
        title,
        description,
        price,
        dietaryInfo,
        menuImage,
      },
    });

    return res.status(200).json({
      message: "menuItem information updated successfully",
      menuItem: updateMenuItem,
    });
  } catch (err) {
    next(err)
  }
});

// GET ALL FOODMENU - GET
router.get("/", async (req, res, next) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
       Feedback: true
      },
    });

    return res.status(200).json({
      message: "menuItems information retrieved successfully",
      menuItems,
    });
  } catch (err) {
    next(err)
  }
});


//  GET UNIQUE FOODMENU BY ID - GET
router.get("/:id", async (req, res, next) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
      include: {
        Feedback: true
      },
    });

    if (!menuItem) {
      return res.status(404).json({
        message: "menuItem not found",
      });
    }
    return res.status(200).json({
      message: "menuItem information retrieved successfully",
      menuItem: menuItem,
    });
  } catch (err) {
     next(err)
  }
});


//  DELETE EXISTING FOODMENU BY ID - GET
router.delete("/:id", authenticate, async (req, res, next) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const delatemenuItem = await prisma.menuItem.delete({
      where: { id: menuItemId },
    });
    if (!delatemenuItem) {
      return res.status(404).json({
        message: "Owner was not found",
      });
    }

    return res.status(200).json({
      message: "menuItem deleted successfully",
    });
  } catch (err) {
    next(err)
  }
});

export default router;
