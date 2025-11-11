import Product from "../models/product.model.js"

export const createProduct = async (req, res) => {
    try {
        const clientProductInfo = req.body;

        const newProduct = new Product(clientProductInfo);

        await newProduct.save();

        return res.status(200).json({
            success: true,
            data: {
                data: newProduct
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSearch = (req, res) => {
    // search product using category? searchText? limit? 
    // example http://localhost:5500/api/v1/products/search?searchText=iphone&category=mobile&minPrice=500&maxPrice=2000&limit=20
    try {
        const { searchText = "", category, minPrice, maxPrice, limit = 10, page = 1 } = req.query;
        console.log({ searchText, category, minPrice, maxPrice, limit, page })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const existingProduct = await Product.findById(req.params.id);

        if (!existingProduct) {
            const error = new Error("No product found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: {
                product: existingProduct
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const updateProduct = (req, res) => {
    // udpate existing product (only admin)
}

export const deleteProduct = (req, res) => {
    // delete product from db (only admin)
}

export const getProductsByCategory = (req, res) => {
    // get products using category 
}

export const bulkUploadProducts = (req, res) => {
    // upload multiple products (json) (only admins)
}

