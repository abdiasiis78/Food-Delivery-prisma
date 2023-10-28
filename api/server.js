import express from 'express';
import { json } from 'express';
// import prisma from './lib/index.js';

const server = express();
server.use(json());
import OwnerRoute from '../routes/owner.js'
import UserRoute from '../routes/users.js'
import RestaurantRoute from '../routes/restaurants.js'
import FoodRouter from '../routes/food.js'
import OrderRoute from '../routes/orders.js'
import RatingRoute from "../routes/feedback.js"

server.use("/api/owner", OwnerRoute)
server.use("/api/user", UserRoute)
server.use("/api/restaurant", RestaurantRoute)
server.use("/api/menuItem", FoodRouter)
server.use("/api/order", OrderRoute)
server.use("/api/rating", RatingRoute)
export default server;
