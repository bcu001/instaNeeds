import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    categoryName :{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    slug: {
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    imageURL:{
        type:String,
        required:true,
        trim:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});

const Category = mongoose.model("Category", categorySchema);
export default Category;