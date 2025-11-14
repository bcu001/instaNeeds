import { Router } from "express";
import { signIn, signOut, signUp, validate } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/sign-out", signOut)
authRouter.get("/validate", validate)

export default authRouter;