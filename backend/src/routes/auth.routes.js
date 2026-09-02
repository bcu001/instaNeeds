import { Router } from "express";
import { signIn, signOut, signUp, getCurrentUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/me", getCurrentUser)
authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)

export default authRouter;