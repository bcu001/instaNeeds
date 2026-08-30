import express from 'express'
import authorize from '../middleware/auth.middleware.js';
import { addToCart, removeFromCart } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post("/additem", authorize, addToCart)
cartRouter.delete("/removeitem", authorize, removeFromCart)

export default cartRouter;