import React from "react";
import CategoryCard from "@/components/CategoryCard";
import category from "@/utils/category.js";

const ShopByCategory = () => {
  return (
    <div className="def-pad">
      <h2 className="header">Shop by Category</h2>
      <div className="flex overflow-x-auto scroll-smooth px-2 py-5 gap-5">
        {category.map((c) => (
          <div key={c.name}>
            <CategoryCard category={c} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;