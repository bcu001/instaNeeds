import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const server_url = import.meta.env.VITE_SERVER_URL;

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [resultList, setResultList] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("search")
    const res = await axios.get(
      `${server_url}/products/search?q=${query}&category=${query}&limit=10`
    );
    setResultList(res.data.data.productList);
  };

  const handletest = () => {
    console.log({ resultList });
  };

  return (
    <div className="def-pad">
      <div className="relative ">
        <form className="flex gap-3" onSubmit={handleOnSubmit}>
          <input
            className="w-full bg-input text-text px-2 py-3 pl-12 rounded-lg  outline-primary no-clear"
            type="search"
            placeholder="search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={true}
          />
          <button className="def-btn hidden" type="submit">
            {" "}
            Search
          </button>
        </form>

        <motion.div
          // initial={{ opacity: 0, x: -100 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute left-3 top-3"
        >
          <Link to={"/"}>
            <ArrowLeft size={25} />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 pt-6 gap-3">
        {resultList.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
