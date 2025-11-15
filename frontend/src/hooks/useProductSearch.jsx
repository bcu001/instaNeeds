import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const server_url = import.meta.env.VITE_SERVER_URL;

const useProductSearch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      // before starting hook default all values
      setError(null);
      setLoading(true);
      setData([]);

      // if the query is empty show error
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

        setData(productList);

        if (productList.length === 0) {
          setError("No results found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]);

  return { data, loading, error };
};

export default useProductSearch;
