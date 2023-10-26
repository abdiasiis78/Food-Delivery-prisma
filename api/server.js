import express from 'express';
import { json } from 'express';
// import prisma from './lib/index.js';

const server = express();
server.use(json());
import OwnerRoute from '../routes/owner.js'
import UserRoute from '../routes/users.js'
import restaurantRoute from '../routes/restaurants.js'
import foodRouter from '../routes/food.js'
import orderRoute from '../routes/orders.js'

server.use("/api/owner", OwnerRoute)
server.use("/api/user", UserRoute)
server.use("/api/restaurant", restaurantRoute)
server.use("/api/menuItem", foodRouter)
server.use("/api/order", orderRoute)
export default server;
