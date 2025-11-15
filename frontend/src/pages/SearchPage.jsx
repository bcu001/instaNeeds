import React, { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const server_url = import.meta.env.VITE_SERVER_URL;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [resultList, setResultList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    setResultList([]);

    if (!query.trim()) {
      setError("Enter something to be searched");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${server_url}/products/search?q=${query}&limit=10`
      );

      const productList = res.data?.data?.productList || [];

      setResultList(productList);
      // console.log(res.data, query);

      if (productList.length === 0) {
        setError("No results found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="def-pad">
      <div className="relative ">
        <form className="flex gap-3" onSubmit={handleOnSubmit}>
          <input
            className="w-full bg-input text-text px-2 py-3 pl-12 rounded-lg  outline-primary no-clear border-text border-2"
            type="search"
            placeholder="search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={true}
          />
          <button className="def-btn hidden" type="submit">
            Search
          </button>
        </form>

        <div className="absolute left-3 top-3">
          <Link to={"/"}>
            <ArrowLeft size={25} />
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pt-6 gap-3">
        {/* Results */}
        {!loading &&
          resultList.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>

      <div>
        {/* Loading state */}
        {loading && (
          <span className="text-primary col-span-3 text-center">
            Searching...
          </span>
        )}

        {/* Error or empty state */}
        {!loading && error && (
          <span className="text-error col-span-3 text-center">{error}</span>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
