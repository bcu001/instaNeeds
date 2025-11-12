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

export const getSearch = async (req, res) => {
    // search product using category? searchText? limit? 
    // url example -> http://localhost:5500/api/v1/products/search?q=iphone&category=mobile&limit=10&page=1
    try {
        const { q = "", category = "", limit = 5, page = 1 } = req.query;

        const skip = (Number(page) - 1) * Number(limit);


        const hasSearchQuery = q.trim() !== "" || category.trim() !== "";

        if (!hasSearchQuery) return res.status(400).json({
            success: false,
            message: "Give atleast searchText or category"
        })

        const byTitle = [];
        const byCategory = [];

        const facetStage = {};

        if (q.trim() !== "") {
            byTitle.push({ $match: { title: { $regex: q, $options: "i" } } });
            facetStage.byTitle = byTitle;
        }

        if (category.trim() !== "") {
            byCategory.push({ $match: { category: { $regex: category, $options: "i" } } })

            facetStage.byCategory  = byCategory;
        }

        const pipelines = [
            {
                $facet:facetStage
            },
            {
                $project: {
                    combined: {
                        $setUnion: [
                            { $ifNull: ["$byTitle", []] },
                            { $ifNull: ["$byCategory", []] }
                        ]
                    }
                }

            },
            { $unwind: "$combined" },
            {
                $group: {
                    _id: "$combined._id",
                    doc: { $first: "$combined" }
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" }
            },
            { $skip: skip },
            { $limit: Number(limit) }
        ];

        const searchResult = await Product.aggregate(pipelines);

        return res.status(200).json({
            success: true,
            data: {
                query: q,
                category,
                productList: searchResult
            }
        })

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

        res.status(200).json({
            success: true,
            data: {
                productList
            }
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const bulkUploadProducts = (req, res) => {
    // upload multiple products (json) (only admins)
}

