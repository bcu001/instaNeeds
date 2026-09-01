import getCategoriesQueryOptions from "@/queryOptions/getCategoriesQueryOptions";
import { useQuery } from "@tanstack/react-query";


export default function useCategory(page){
    return useQuery(getCategoriesQueryOptions(page));
}