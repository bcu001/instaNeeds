import getProductByIdQueryOptions from "@/queryOptions/getProductByIdQueryOptions";
import { useQuery } from "@tanstack/react-query";


export default function useProductById(productId){
    return useQuery(getProductByIdQueryOptions(productId))
}