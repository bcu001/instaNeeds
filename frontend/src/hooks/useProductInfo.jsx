import React, { useState, useEffect } from "react";
import axios from "axios";
import { server_url } from "@/utils/env";

const useProductInfo = (productId) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProductById() {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const res = await axios.get(`${server_url}/products/${productId}`);
        setData(res.data.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProductById();
  }, [productId]);

  return {
    loading,
    data,
    error,
  };
};

export default useProductInfo;
