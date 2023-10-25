import express from "express";
import prisma from "../api/lib/index.js";
import "dotenv/config";
import authenticate from "../api/middleware/middleware.js";
const router = express();

router.post("/", authenticate, async (req, res) => {
  const { name, description, price, restaurantId, dietaryInfo } = req.body;

  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name: name,
        description: description,
        price: price,
        restaurantId: restaurantId,
        dietaryInfo: dietaryInfo,

      },
    });
    return res.status(201).json({
      message: "menuItem created successfully",
      menuItem: newMenuItem,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const foodId = parseInt(req.params.id);
  const { name, description, price, restaurantId, dietaryInfo } = req.body;
  try {
    const updateMenuItem = await prisma.menuItem.update({
      where: { id: foodId },
      data: {
        name,
        description,
        price,
        restaurantId,
        dietaryInfo
      },
    });

    return res.status(200).json({
      message: "menuItem information updated successfully",
      menuItem: updateMenuItem,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});


router.get("/", async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        restaurant: true,
        rating: true
      },
    });

    return res.status(200).json({
      message: "menuItems information retrieved successfully",
      menuItems,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const menuItemId = parseInt(req.params.id);
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
      include: {
        restaurant: true,
        rating: true
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
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
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
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

export default router;
