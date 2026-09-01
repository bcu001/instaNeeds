import { getProducts } from "@/services/product.service";
import { queryOptions } from "@tanstack/react-query";


export default function getProductsQueryOptions(page,searchQuery){
    return queryOptions({
        queryKey: ["getProducts", page, searchQuery],
		queryFn: getProducts
    })
}