import Category from "../models/category.model.js"
import apiResponse from "../utils/apiResponse.js";
import nameToSlug from "../utils/nameToSlug.js";

export const getCategories = async(req,res)=>{
   try{
       const page = Number(req.query.page);
       const totalCategories = await Category.countDocuments({isActive:true});
        const limit = Math.min(Math.max(req.query.limit,1), totalCategories);
        const skip = (page-1)*limit;
        const totalPages = Math.ceil(totalCategories/limit);
        const categories = await Category.find({isActive:true}).limit(limit).skip(skip).lean();
        if(categories.length === 0) return apiResponse(res,"no categories found",200);
        return apiResponse(res,"categories found", 200, {
            totalCategories,
            totalPages,
            currPage:page,
            limit,
            skip,
            categories
        })
   } catch (error){
    console.error("Error at getCategories",error);
    return apiResponse(res,"Error at getCategories", 500);
   }
}

export const getCategoryById = async(req,res)=>{
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category) return apiResponse(res,'category not found',404);
        return apiResponse(res,"category found", 200, {category});
    } catch(error){
        console.error("Error at getCategoryById", error);
        return apiResponse(res,"Error at getCategoryById",500);
    }
}

export const createCategory = async(req,res)=>{
    try {
        const {categoryName, description, imageURL}=req.body;
        const category = await Category.create({
            categoryName,
            description,
            imageURL,
            slug: nameToSlug(categoryName)
        })
        return apiResponse(res,"category created",201,{category});
    } catch (error) {
        console.error("Error at createCategory",error);
        return apiResponse(res,"Error at createCategory", 500);
    }
}
export const deleteCategory = async(req,res)=>{

}