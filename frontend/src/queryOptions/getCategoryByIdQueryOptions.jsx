import { getCategoryById } from "@/services/category.service"
import { queryOptions } from "@tanstack/react-query"


export default function getCategoryByIdQueryOptions(category){
    return queryOptions({
		queryKey:["getCategoryById", category],
		queryFn:getCategoryById,
		staleTime: 30 * 60 * 1000,
        enabled: !!category
	})
}