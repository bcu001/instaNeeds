import { getCategories } from "@/services/category.service";
import { queryOptions } from "@tanstack/react-query";


export default function getCategoriesQueryOptions(page){
    return queryOptions({
		queryKey:["getCategories",page],
		queryFn:getCategories,
		staleTime: 30 * 60 * 1000
	})
}