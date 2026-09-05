import { Router } from "express";
import { signIn, signOut, signUp, getCurrentUser, refreshToken, signoutAll } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/me", getCurrentUser)
authRouter.post("/signup", signUp)
authRouter.post("/signin", signIn)
authRouter.post("/signout", signOut)
authRouter.post("/signout-all", signoutAll)
authRouter.post("/refresh", refreshToken)

export default authRouter;