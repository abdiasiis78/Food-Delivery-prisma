// waan bilaa bi doona
import  express from "express";
import bcrypt from 'bcrypt'
import prisma from "../api/lib/index.js"
import Jwt from "jsonwebtoken";
import "dotenv/config"
import authenticate from '../api/middleware/middleware.js'
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post("/signup", async (req, res) => {
    const {name, username, email, password, profileImage} = req.body
    try{

        const isexisting =  await prisma.user.findUnique({
            where:{
                email: email,
                username: username,
            }
        })

        if(isexisting) {
            return res.status(409).json({
                message: "user is alredy exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10) 
        
        const newuser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: hashedPassword,
                profileImage: profileImage
            }
        })

        return res.status(201).json({
            message: "user creation successfully",
            user: newuser 
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

     const isexistinguser = await prisma.user.findUnique({
        where: {
            email
        }
     }) 

     if(!isexistinguser){
        res.status(404).json({
        message: "user was not found"
        })
    }


    const checkPassword = await bcrypt.compare(password, isexistinguser.password)

    if(!checkPassword){
      res.status(401).json({
        message: 'invalid credentials'
      })
    }


   const token = Jwt.sign(
    {id: isexistinguser.id , email: isexistinguser.email },
    SECRET_KEY,
    {expiresIn: '3h'}

   ) 
    return res.status(201).json({
        message: 'user logedin successfully',
        token: token  
    })

    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }
})


router.put('/:id', authenticate, async (req, res) => {
    const userId = parseInt(req.params.id);
    const {name, username, email, password, profileImage } = req.body;
  
    try {
      const updateduser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          username, 
          email, 
          password: password ? await bcrypt.hash(password, 10) : undefined, 
          profileImage
        }
      });
  
      return res.status(200).json({
        message: 'user information updated successfully',
        user: updateduser
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message
      });
    }
  });


  router.delete('/:id', async (req, res) => {
    const userId =  parseInt(req.params.id);
  
    try {
      const deleteuser = await prisma.user.delete({
        where: { id: userId }
      });
  
      if (!deleteuser) {
        return res.status(404).json({
          message: "user was not found"
        });
      }
  
      return res.status(200).json({
        message: 'user deleted successfully'
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message
      });
    }
  });
  
  
  
  
  router.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          username: true,
          name: true,
          email: true,
          profileImage: true
        },
      });
  
      if (!user) {
        return res.status(404).json({
          message: 'user not found',
        });
      }
  
      return res.status(200).json({
        message: 'user information retrieved successfully',
        user,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });
  

  router.get('/', async (req, res) => {
    const { name, email, username, profileImage } = req.query; 
  
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: name || '' } },
            { email: { contains: email || '' } },
            { username: { contains: username || '' } },
            { profileImage: { contains: profileImage || '' } },
          ],
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            profileImage: true,
          },
      });
      
      return res.status(200).json({
        message: 'users list retrieved successfully',
        users,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    }
  });
  
  
  
  export default router;













  
  