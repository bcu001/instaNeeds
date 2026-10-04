import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useForm, useWatch } from "react-hook-form";
import NoSearchResultUI from "@/components/common/NoSearchResultUI";
import useProducts from "@/hooks/useProducts";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import ApiErrorUI from "@/components/common/ApiErrorUI";
import { getApiErrorMessage } from "@/lib/apiError";
import ProductCardSKeleton from "@/components/SkeletonLoaders/ProductCardSkeleton";

const ProductsPage = () => {
  useDocumentTitle("All Products | InstaNeeds");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const { register, control, reset, setValue } = useForm({
    defaultValues: {
      q: initialQ,
    },
  });

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const urlQ = searchParams.get("q") || "";

  const search = useWatch({
    control,
    name: "q",
  });

  useEffect(() => {
    setValue("q", urlQ);
  }, [urlQ, setValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search || "");
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const { isPending, data, isError, error, refetch, isSuccess } = useProducts(
    page,
    searchQuery,
  );

  const handleReset = () => {
    reset({ q: "" });
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All products
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Browse fresh groceries, snacks, and daily household essentials.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full sm:max-w-xs">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              id="q"
              placeholder="Filter products…"
              className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              {...register("q")}
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-6">
        {isError && (
          <ApiErrorUI
            message={getApiErrorMessage(error, "Unable to load products")}
            onRetry={refetch}
          />
        )}

        {!isPending && data?.products?.length === 0 && (
          <NoSearchResultUI reset={handleReset} />
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {isPending &&
            Array.from({ length: 12 }).map((_, idx) => (
              <ProductCardSKeleton key={idx} />
            ))}

          {data?.products?.length > 0 &&
            data.products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>

      {/* Pagination */}
      {isSuccess && data?.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-outline btn-sm rounded-lg h-8 px-3 text-xs disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-xs text-muted-foreground">
            Page <span className="font-semibold text-foreground">{page}</span>{" "}
            of {data?.totalPages}
          </span>
          <button
            disabled={page >= data?.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-outline btn-sm rounded-lg h-8 px-3 text-xs disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
