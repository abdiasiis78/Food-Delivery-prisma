import express from "express";
import prisma from "../api/lib/index.js";
import { userVerify } from "../api/middleware/middleware.js";

const router = express.Router();

// CREATE NEW FEEDBACK - POST 
router.post("/", userVerify, async (req, res) => {
  const { text, rating, menuItemId } = req.body;
  const userId = req.user.id;

  try {
    const newfeedback = await prisma.feedback.create({
      data: {
        text: text,
        rating: rating,
        userId,
        menuItemId: menuItemId,
      },
    });

    return res.status(201).json({
      message: "feedback created successfully",
      rating: newfeedback,
    });
  } catch (err) {
    return res.status(500).json({
      message: "somthing went wrong",
      error: err.message,
    });
  }
});


// UPDATE EXISTING FEEDBACK - PUT
router.put("/:id", userVerify, async (req, res) => {
  const feedbackId = parseInt(req.params.id);
  const { text, rating, menuItemId } = req.body;
  const userId = req.user.id;

  try {
    const updateFeedback = await prisma.feedback.update({
      where: { id: feedbackId },

      data: {
        text: text,
        rating: rating,
        userId,
        menuItemId: menuItemId,
      },
    });

    return res.status(201).json({
      message: "rating updating successfully",
      rating: updateRating,
    });
  } catch (err) {
    return res.status(500).json({
      message: "somthing went wrong",
      error: err.message,
    });
  }
});


// GET UNIQUE FEEDBACK BY ID - GET
router.get("/:id", async (req, res) => {
  const feedbackId = parseInt(req.params.id);
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        MenuItem: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            dietaryInfo: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!feedback) {
      return res.status(404).json({
        message: "feedback not found",
      });
    }
    return res.status(200).json({
      message: "feedback retrieved successfully",
      feedback: feedback,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

//  GET ALL FEEDBACK - GET
router.get("/", async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: {
        MenuItem: {
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            dietaryInfo: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!feedbacks) {
      return res.status(404).json({
        message: "feedbacks not found",
      });
    }
    return res.status(200).json({
      message: "feedbacks retrieved successfully",
      feedback: feedbacks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});


// Delete the feedback by ID
router.delete("/:id", userVerify, async (req, res) => {
  const feedbackId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!existingFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    if (existingFeedback.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized: Feedback does not belong to the authenticated user",
      });
    }

    // Delete the feedback
    await prisma.feedback.delete({
      where: { id: feedbackId },
    });

    return res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});


export default router;
