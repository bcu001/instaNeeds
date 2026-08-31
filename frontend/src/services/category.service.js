import api from "@/lib/axios";

export async function getCategories({queryKey}){
    const [,page] = queryKey;
    const res = await api.get(`/categories?page=${page}&limit=6`);
    return res.data?.data;
}

export const getCategoryById = async({queryKey})=>{
    const [,_id] = queryKey;
    const res = await api.get(`/categories/${_id}`);
    return res.data?.data;
}