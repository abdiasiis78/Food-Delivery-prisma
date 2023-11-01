import express from "express";
import prisma from "../api/lib/index.js";
import {authenticate} from "../api/middleware/middleware.js";
import {userVerify} from "../api/middleware/middleware.js";
import { OrderStatus } from "@prisma/client";

// PROCESSING
// DELIVERING
// DELIVERED
// "orderDate": "2023-10-26T09:30:00Z"


const router = express.Router();

router.post("/", userVerify, async (req, res) => {
  const { orderDate, deliveryAddress, totalPrice, status, menuItemId } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = await prisma.order.create({
      data: {
        orderDate,
        deliveryAddress,
        totalPrice,
        status: OrderStatus.PROCESSING,
        menuItemId,
        userId,
      },
    });

    return res.status(201).json({
      message: "We are preparing your delicious food.",
      order: newOrder
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

// Updating the status from PROCESSING to DELIVERING
router.put('/delivering/:id', authenticate, async (req, res) => {
  const orderId = parseInt(req.params.id);
  
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.DELIVERING,
      },
    });

    return res.json({
      message: 'Order is now being delivered.',
      order: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong while updating the order status',
      error: err.message,
    });
  }
});


// Updating the status from DELIVERING to DELIVERED
router.put('/deliverd/:id', authenticate, async (req, res) => {
  const orderId = parseInt(req.params.id);
  
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.DELIVERED,
      },
    });

    return res.json({
      message: 'Order has been successfully delivered.',
      order: updatedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong while updating the order status',
      error: err.message,
    });
  }
});



router.get('/:id', async (req, res) => {
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
          select:{
            id: true,
            name: true,
            description: true,
            price: true,
            dietaryInfo: true
          }
        }
      },
    });

    if (order) {
      return res.json({
       message: "Order retrieved successfully",
        order: order
      });

    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong while retrieving the order',
      error: err.message,
    });
  }
});



router.get('/', async (req, res) => {
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
            name: true,
            description: true,
            price: true,
            dietaryInfo: true,
          },
        },
      },
    });

    return res.json({
      message: 'Orders retrieved successfully',
      orders: orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong while retrieving orders',
      error: err.message,
    });
  }
});



router.delete('/:id', authenticate, async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return res.json({
      message: 'Order deleted successfully',
      order: deletedOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong while deleting the order',
      error: err.message,
    });
  }
});


export default router;
