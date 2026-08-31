import { Router } from 'express';
import { bulkUploadProducts, createProduct, deleteProduct, getProductById, getProductsByCategory, updateProduct,getProducts, getFeaturedProduct  } from '../controllers/product.controller.js';
import authorize from '../middleware/auth.middleware.js';
import authorizeAdmin from '../middleware/admin.middleware.js';

const productRouter = Router();

productRouter.get("/", getProducts)
productRouter.get("/featured", getFeaturedProduct)
productRouter.post("/", authorize, authorizeAdmin, createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", authorize, authorizeAdmin, updateProduct);
productRouter.delete("/:id",authorize, authorizeAdmin, deleteProduct);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/bulk",authorize, authorizeAdmin, bulkUploadProducts);

export default productRouter;