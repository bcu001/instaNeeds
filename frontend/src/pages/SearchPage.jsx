import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import SearchBar from "@/components/common/SearchBar";
import useProductSearch from "@/hooks/useProductSearch";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q");

  const { data: resultList, loading, error } = useProductSearch(q);

  console.log("search Page");

  return (
    <div className="def-pad">
      <SearchBar />

      {/* Results */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-6 gap-3">
        {loading && (
          <span className="text-primary col-span-3 text-center">
            Searching...
          </span>
        )}

        {!loading && error && (
          <span className="text-error col-span-3 text-center">{error}</span>
        )}

        {!loading && !error && resultList.length === 0 && (
          <span className="text-primary col-span-3 text-center">
            no product found
          </span>
        )}

        {!loading &&
          !error &&
          resultList.length > 0 &&
          resultList.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
};

export default SearchPage;
