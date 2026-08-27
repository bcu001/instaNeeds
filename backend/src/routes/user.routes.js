import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, getUsers)

userRouter.get('/:id', authorize, getUserById)

export default userRouter;