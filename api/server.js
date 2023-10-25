import express from 'express';
import { json } from 'express';
// import prisma from './lib/index.js';

const server = express();
server.use(json());
import OwnerRoute from '../routes/owner.js'
import UserRoute from '../routes/users.js'
import restaurantRoute from '../routes/restaurants.js'


server.use("/api/owner", OwnerRoute)
server.use("/api/user", UserRoute)
server.use("/api/restaurant", restaurantRoute)
export default server;
