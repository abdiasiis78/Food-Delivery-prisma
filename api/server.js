import express from 'express';
import { json } from 'express';
// import prisma from './lib/index.js';

const server = express();
server.use(json());
import OwnerRoute from '../routes/owner.js'
import UserRoute from '../routes/users.js'
import FoodRouter from '../routes/food.js'
import OrderRoute from '../routes/orders.js'
import RatingRoute from "../routes/feedback.js"

// OWNER ROUTE
server.use("/api/owner", OwnerRoute)

// USER ROUTE
server.use("/api/user", UserRoute)

// MENUITEM ROUTE
server.use("/api/menuItem", FoodRouter)

// OREDER ROUTE
server.use("/api/order", OrderRoute)

// FEEDBACK ROUTE
server.use("/api/feedback", RatingRoute)

export default server;
