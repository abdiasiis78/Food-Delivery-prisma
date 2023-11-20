import express from "express";
import prisma from "../api/lib/index.js";
import { authenticate } from "../api/middleware/middleware.js";
import { userVerify } from "../api/middleware/middleware.js";
import { OrderStatus } from "@prisma/client";

// PROCESSING
// DELIVERING
// DELIVERED
// "orderDate": "2023-10-26T09:30:00Z"

const router = express.Router();

//  CREATE NEW ORDER - POST
router.post("/", userVerify, async (req, res, next) => {
  const { orderDate, deliveryAddress, menuItemId } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = await prisma.order.create({
      data: {
        orderDate,
        deliveryAddress,
        status: OrderStatus.PROCESSING,
        menuItemId,
        userId,
      },
    });

    return res.status(201).json({
      message: "We are preparing your delicious food.",
      order: newOrder,
    });
  } catch (err) {
    next(err);
  }
});

// Updating the status from PROCESSING to DELIVERING
router.put("/delivering/:id", authenticate, async (req, res, next) => {
  const orderId = parseInt(req.params.id);

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.DELIVERING,
      },
    });

    return res.json({
      message: "Order is now being delivered.",
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
});

// Updating the status from DELIVERING to DELIVERED
router.put("/deliverd/:id", authenticate, async (req, res, next) => {
  const orderId = parseInt(req.params.id);

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.DELIVERED,
      },
    });

    return res.json({
      message: "Order has been successfully delivered.",
      order: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
});

// GET UNIQUE ORDER BY ID - GET
router.get("/:id", async (req, res, next) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        MenuItem: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            dietaryInfo: true,
          },
        },
      },
    });

    if (order) {
      return res.json({
        message: "Order retrieved successfully",
        order: order,
      });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    next(err);
  }
});

//  GET ALL ORDERS - GET
router.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        MenuItem: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            dietaryInfo: true,
          },
        },
      },
    });

    return res.json({
      message: "Orders retrieved successfully",
      orders: orders,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE ORDER BY ID - DELETE
router.delete("/:id", authenticate, async (req, res, next) => {
  const orderId = parseInt(req.params.id);

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return res.json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
