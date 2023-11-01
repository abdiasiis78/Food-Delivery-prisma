import  express from "express";
import bcrypt from 'bcrypt'
import prisma from "../api/lib/index.js"
import Jwt from "jsonwebtoken";
import "dotenv/config"
import {authenticate} from '../api/middleware/middleware.js'
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post("/signup", async (req, res) => {
    const {name, email, password, username} = req.body
    try{

        const isexisting =  await prisma.owner.findUnique({
            where:{
                email: email,
                username: username,
            }
        })

        if(isexisting) {
            return res.status(409).json({
                message: "owner is alredy exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10) 
        
        const newOwner = await prisma.owner.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                username: username
            }
        })

        return res.status(201).json({
            message: "owner creation successfully",
            owner: newOwner 
        })
     
    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }
})


router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try{

     const isexistingOwner = await prisma.owner.findUnique({
        where: {
            email
            
        }
     }) 

     if(!isexistingOwner){
        res.status(404).json({
        message: "owner was not found"
        })
    }


    const checkPassword = await bcrypt.compare(password, isexistingOwner.password)

    if(!checkPassword){
      res.status(401).json({
        message: 'invalid credentials'
      })
    }


   const token = Jwt.sign(
    {id: isexistingOwner.id },
    SECRET_KEY,
    {expiresIn: '3h'}

   ) 
    return res.status(201).json({
        message: 'owner logedin successfully',
        token: token  
    })

    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }
})


router.put('/update', authenticate, async (req, res) => {
    const ownerId = req.owner.id
    const { name, email, username, password } = req.body;
  
    try {
      const updatedOwner = await prisma.owner.update({
        where: { id: ownerId },
        data: {
          name,
          email, 
          username, 
          password: password ? await bcrypt.hash(password, 10) : undefined, 
        }
      });
  
      return res.status(200).json({
        message: 'Owner information updated successfully',
        owner: updatedOwner
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message
      });
    }
  });


  router.delete('/delete', authenticate, async (req, res) => {
    const ownerId = req.owner.id
  
    try {
      const deleteOwner = await prisma.owner.delete({
        where: { id: ownerId }
      });
  
      if (!deleteOwner) {
        return res.status(404).json({
          message: "Owner was not found"
        });
      }
  
      return res.status(200).json({
        message: 'Owner deleted successfully'
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message
      });
    }
  });
  
  
  
  
  router.get('/curentOwner', authenticate, async (req, res) => {
    const ownerId = req.owner.id;

    try {
      const owner = await prisma.owner.findUnique({
        where: { id: ownerId },
        select: {
          id:true,
          name: true,
          email: true,
          username: true,
        },
      });
  
      if (!owner) {
        return res.status(404).json({
          message: 'Owner not found',
        });
      }
  
      return res.status(200).json({
        message: 'Owner information retrieved successfully',
        owner,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });
  

  router.get('/', async (req, res) => {
  
    try {
      const owners = await prisma.owner.findMany({
        select: {
          id:true,
          name: true,
          email: true,
          username: true,
        },
      });
      
      return res.status(200).json({
        message: 'Owners list retrieved successfully',
        owners,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });
  
  
  
  export default router;


