import { getProductById } from "@/services/product.service";
import { queryOptions } from "@tanstack/react-query";

export default function getProductByIdQueryOptions(productId){
    return queryOptions({
		queryKey:["getProductById", productId],
		queryFn:getProductById,
		enabled: !!productId
	})
}