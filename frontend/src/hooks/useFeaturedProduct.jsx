import getFeaturedProductsQueryOptions from "@/queryOptions/getFeaturedProductsQueryOptions";
import { useQuery } from "@tanstack/react-query";


export default function useFeaturedProduct(){
    return useQuery(getFeaturedProductsQueryOptions());
}