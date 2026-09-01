import getProductsQueryOptions from "@/queryOptions/getProductsQueryOptions";
import { useQuery } from "@tanstack/react-query";


export default function useProducts(page,searchQuery){
    return useQuery(getProductsQueryOptions(page,searchQuery));
}