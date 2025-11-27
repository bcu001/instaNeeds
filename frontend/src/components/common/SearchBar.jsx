import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="relative ">
      <form className="flex gap-3" onSubmit={handleOnSubmit}>
        <input
          className="w-full bg-input text-text px-2 py-3 pl-12 rounded-lg outline-primary no-clear border border-text"
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
  );
};

export default SearchBar;
