import getCategoryByIdQueryOptions from "@/queryOptions/getCategoryByIdQueryOptions";
import { useQuery } from "@tanstack/react-query";

export default function useCategoryById(category){
    return useQuery(getCategoryByIdQueryOptions(category));
}