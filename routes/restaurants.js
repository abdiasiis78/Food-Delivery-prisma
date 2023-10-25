import express from "express";
import prisma from "../api/lib/index.js";
import "dotenv/config";
import authenticate from "../api/middleware/middleware.js";
const router = express();

router.post("/", authenticate, async (req, res) => {
  const { name, address, cuisineType, ownerId } = req.body;

  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: name,
        address: address,
        cuisineType: cuisineType,
        ownerId: ownerId,
      },
    });
    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const restId = parseInt(req.params.id);
  const { name, address, cuisineType, ownerId } = req.body;
  try {
    const updateRestaurant = await prisma.restaurant.update({
      where: { id: restId },
      data: {
        name,
        address,
        cuisineType,
        ownerId,
      },
    });

    return res.status(200).json({
      message: "Restaurant information updated successfully",
      restaurant: updateRestaurant,
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
    const restaurants = await prisma.restaurant.findMany({
      include: {
        Owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Restaurants information retrieved successfully",
      restaurants,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const restaurantId = parseInt(req.params.id);
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        Owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "restaurant not found",
      });
    }
    return res.status(200).json({
      message: "Restaurant information retrieved successfully",
      restaurant: restaurant,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const restaurantId = parseInt(req.params.id);
  try {
    const delateRestaurant = await prisma.restaurant.delete({
      where: { id: restaurantId },
    });
    if (!delateRestaurant) {
      return res.status(404).json({
        message: "Owner was not found",
      });
    }

    return res.status(200).json({
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

export default router;
