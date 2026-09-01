import { getFeaturedProducts } from "@/services/product.service"
import { queryOptions } from "@tanstack/react-query";


export default function getFeaturedProductsQueryOptions(){
    return queryOptions({
		queryKey:["getFeaturedProducts"],
		queryFn:getFeaturedProducts,
		staleTime: 15 * 60 * 1000
	})
}