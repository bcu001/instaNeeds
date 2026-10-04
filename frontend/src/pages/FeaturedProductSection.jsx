import { useState, useMemo } from "react";
import { Link } from "react-router";
import useFeaturedProduct from "@/hooks/useFeaturedProduct";
import useCategory from "@/hooks/useCategory";
import ProductCard from "@/components/product/ProductCard";
import ApiErrorUI from "@/components/common/ApiErrorUI";
import { getApiErrorMessage } from "@/lib/apiError";
import ProductCardSKeleton from "@/components/SkeletonLoaders/ProductCardSkeleton";

export default function FeaturedProductSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data,
    isError: featuredError,
    error: featuredErrorDetails,
    refetch: refetchFeatured,
    isPending: isFeaturedProductPending,
    isSuccess: isSuccessFeaturedProduct,
  } = useFeaturedProduct();

  const { data: categoryData } = useCategory(1);

  // Extract categories for tabs
  const categoryTabs = useMemo(() => {
    const list = [{ id: "all", name: "All" }];
    if (categoryData?.categories) {
      categoryData.categories.slice(0, 5).forEach((c) => {
        list.push({ id: c._id, name: c.categoryName });
      });
    }
    return list;
  }, [categoryData]);

  // Filter products by selected tab
  const products = useMemo(() => {
    if (!data?.products) return [];
    if (selectedCategory === "all") return data.products;
    return data.products.filter((p) => p.category === selectedCategory);
  }, [data, selectedCategory]);

  return (
    <section id="shop" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header with Title and shadcn-style Category Tabs */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Featured products
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Fresh picks, restocked daily.
          </p>
        </div>

        {/* Tab pills matching reference design */}
        {categoryTabs.length > 1 && (
          <div
            role="tablist"
            className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-muted p-1 no-scrollbar"
          >
            {categoryTabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`rounded-[7px] px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                    active
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        {featuredError && (
          <ApiErrorUI
            message={getApiErrorMessage(
              featuredErrorDetails,
              "Unable to load featured products",
            )}
            onRetry={refetchFeatured}
          />
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {isFeaturedProductPending &&
            Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSKeleton key={idx} />
            ))}

          {isSuccessFeaturedProduct &&
            products.length > 0 &&
            products.map((p) => <ProductCard key={p._id} product={p} />)}

          {isSuccessFeaturedProduct && products.length === 0 && (
            <div className="col-span-full py-16 text-center text-sm text-muted-foreground">
              No products found in this category.
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="btn btn-outline h-9 rounded-lg px-5 text-sm font-medium border-border hover:bg-muted text-foreground transition-all shadow-xs"
          >
            Browse all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
