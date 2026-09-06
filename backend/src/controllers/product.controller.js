import Product from "../models/product.model.js"
import apiResponse from "../utils/apiResponse.js";

export const getProducts = async(req,res)=>{
    try{
        const q = req.query.q;
        const search = q ? { $or:[
                    {title:{$regex:q, $options:"i"}},
                    {description:{$regex:q,$options:"i"}}
                ]} : {};

        const page =Math.max(Number(req.query.page) || 1,1);
        const totalProducts = await Product.countDocuments(search);
        const limit = 20;
        const totalPages = Math.ceil(totalProducts/limit);
        if(page > totalPages && totalProducts > 0) return apiResponse(res, `page ${page} does not exist`,400);

        const skip = (page - 1) * limit;
        const products = await Product.find(search).limit(limit).skip(skip);
        if(products.length === 0) return apiResponse(res,"no product found",404);
        return apiResponse(res, "products found", 200, {
            totalProducts,
            currPage: page,
            limit,
            skip,
            totalPages,
            products,
        });
    } catch(error){
        console.error("Error at getProducts",error);
        return apiResponse(res,"error at getProducts",500);
    }
}

export const getFeaturedProduct = async(req,res)=>{
    try {
        const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 10);
        const featuredProducts = await Product.find({isFeatured:true}).limit(limit);
        if(featuredProducts.length === 0) return apiResponse(res, "no featured products found", 200);
        return apiResponse(res, "featured product found",200,{
            productCount: featuredProducts.length,
            limit,
            products:featuredProducts,
        })
    } catch (error) {
        console.error("Error at getFeaturedProduct",error);
        return apiResponse(res,"Error at getFeaturedProduct", 500);
    }
}

export const createProduct = async (req, res) => {
    try {
        const {product} = req.body;
        const newProduct = await Product.create(product);
        return apiResponse(res,"product added to db", 201,{newProduct});
    } catch (error) {
        console.error("Error at createProduct",error);
        return apiResponse(res,"error at createProduct",500);
    }
}

export const getProductById = async (req, res) => {
    try {
        const existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) return apiResponse(res, "No product found", 404);
        return apiResponse(res, "product found", 200,{product:existingProduct});
    } catch (error) {
         console.error("Error at getProductById",error);
        return apiResponse(res,"error at getProductById",500);
    }
}

export const updateProduct = async(req, res) => {
     try{
        const {product} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true, runValidators: true });
        if (!updatedProduct) return apiResponse(res, "No product found", 404);
        return apiResponse(res,"product updated", 200,{product:updatedProduct});
    } catch (error){
        console.error("Error at updateProduct",error);
        return apiResponse(res,"Error at updateProduct",500);
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        return apiResponse(res,"product deleted", 200,{product});
    } catch (error){
        console.error("Error at deleteProduct",error);
        return apiResponse(res,"error at deleteProduct",500);
    }
}

export const getProductsByCategory = async (req, res) => {
    // get products using category 
    //  example -> http://localhost:5500/api/v1/products/category/:dairy

    try {
        const { category } = req.params;
        const { limit = 2 } = req.query;

        const productList = await Product.find({ category }).limit(limit);

        if (productList.length === 0) {
            const error = new Error("No product found on these category");
            error.statusCode = 404;
            throw error;
        }

        return apiResponse(res, "products found", 200, { productList })

    } catch (error) {
        console.error("Error at getProductsByCategory", error);
        return apiResponse(res, "Error at getProductsByCategory", 500);
    }
}

export const bulkUploadProducts = (req, res) => {
    // upload multiple products (json) (only admins)
    try {
        return apiResponse(res,"api is not ready", 404);
    } catch (error) {
        console.error("Error at bulkUpLoadProduct",error)
        return apiResponse(res,"Error at bulkUploadProducts", 500)
    }
}

