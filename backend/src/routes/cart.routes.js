import express from 'express'
import authorize from '../middleware/auth.middleware.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.get("/", authorize, getCart)
cartRouter.post("/", authorize, addToCart)
cartRouter.delete("/", authorize, removeFromCart)
cartRouter.delete("/clear", authorize, clearCart)

export default cartRouter;