import { Router } from 'express';
import { bulkUploadProducts, createProduct, deleteProduct, getProductById, getProductsByCategory, getSearch, updateProduct } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/search", getSearch);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/bulk", bulkUploadProducts);

export default productRouter;