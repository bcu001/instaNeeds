import api from "@/lib/axios";

export async function getProducts({queryKey}) {
    const [,page,searchQuery] = queryKey;
    const res = await api.get(`/products`,{
        params:{
            page,
            q: searchQuery || undefined
        }
    })
    return res.data?.data;
}

export async function getProductById({queryKey}){
    const[,id] = queryKey;
    const res = await api.get(`/products/${id}`);
    return res.data?.data;
}

