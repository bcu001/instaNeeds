import express from 'express'
import { createCategory, deleteCategory, getCategories,getCategoryById } from '../controllers/category.controller.js';
import authorizeAdmin from '../middleware/admin.middleware.js';
import authorize from '../middleware/auth.middleware.js';

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post("/",authorize, authorizeAdmin, createCategory)
categoryRouter.delete("/",authorize, authorizeAdmin, deleteCategory)

export default categoryRouter;