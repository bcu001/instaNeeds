import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import useProductSearch from "@/hooks/useProductSearch";

const SearchPage = () => {
  const [params] = useSearchParams();
  const q = params.get("q");

  const { data: resultList, loading, error } = useProductSearch(q);

  return (
    <div className="def-pad">
      <SearchBar />

      {/* Results */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-6 gap-3">
        {!loading &&
          resultList.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>

      <div>
        {loading && (
          <span className="text-primary col-span-3 text-center">
            Searching...
          </span>
        )}

        {!loading && error && (
          <span className="text-error col-span-3 text-center">{error}</span>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
