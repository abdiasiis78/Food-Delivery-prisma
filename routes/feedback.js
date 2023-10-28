import express from 'express'
import prisma from '../api/lib/index.js'
import authenticate from '../api/middleware/middleware.js'

const router = express.Router()



router.post("/" , authenticate, async (req, res) =>{

    const {text, rating, restaurantId, userId, menuItemId} = req.body

    try{
        const newRating = await prisma.rating.create({
            data: {
                text: text,
                rating: rating,
                restaurantId: restaurantId,
                userId: userId,
                menuItemId: menuItemId,
            }
        })

        return res.status(201).json({
            message: "rating created successfully",
            rating: newRating
        })

    }catch(err){
        return res.status(500).json({
            message: "somthing went wrong",
            error: err.message 
        })
    }


})


router.put("/:id", authenticate , async (req, res) =>{
     const ratingId = parseInt(req.params.id)
    const {text, rating, restaurantId, userId, menuItemId} = req.body

    try{
        const updateRating = await prisma.rating.update({
           where:{id: ratingId},

            data: {
                text: text,
                rating: rating,
                restaurantId: restaurantId,
                userId: userId,
                menuItemId: menuItemId,
            }
        })

        return res.status(201).json({
            message: "rating updating successfully",
            rating: updateRating
        })

    }catch(err){
        return res.status(500).json({
            message: "somthing went wrong",
            error: err.message 
        })
    }


})

router.get("/:id", async (req, res) => {
    const ratingId = parseInt(req.params.id)
    try {
        const rating = await prisma.rating.findUnique({
          where: { id: ratingId },
          include: {
            restaurant: true,
            MenuItem:{
                select:{
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    dietaryInfo: true
                  }
            },
            user: {
              select: {
                    id: true,
                    name: true,
                    email: true,
                  },
              }  
            
          },
        });
    
        if (!rating) {
          return res.status(404).json({
            message: "feedback not found",
          });
        }
        return res.status(200).json({
          message: "feedback retrieved successfully",
          feedback: rating,
        });
      } catch (err) {
        return res.status(500).json({
          message: "something went wrong",
          error: err.message,
        });
      }
})



router.get("/", async (req, res) => {
    try {
        const ratings = await prisma.rating.findMany({
          include: {
            restaurant: true,
            MenuItem:{
                select:{
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    dietaryInfo: true
                  }
            },
            user: {
              select: {
                    id: true,
                    name: true,
                    email: true,
                  },
              }  
            
          },
        });
    
        if (!ratings) {
          return res.status(404).json({
            message: "feedbacks not found",
          });
        }
        return res.status(200).json({
          message: "feedbacks retrieved successfully",
          feedback: ratings,
        });
      } catch (err) {
        return res.status(500).json({
          message: "something went wrong",
          error: err.message,
        });
      }
})


export default router