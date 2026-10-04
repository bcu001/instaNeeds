import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import useCategory from "@/hooks/useCategory";
import { useState } from "react";
import CategoryCardSkeleton from "@/components/SkeletonLoaders/CategoryCardSkeleton";
import CategoryCard from "@/components/category/CategoryCard";
import ApiErrorUI from "@/components/common/ApiErrorUI";
import { getApiErrorMessage } from "@/lib/apiError";

const CategorySection = () => {
  const [page, setPage] = useState(1);
  const {
    data: categoriesData,
    isSuccess,
    isError: categoriesError,
    error: categoriesErrorDetails,
    refetch: refetchCategories,
    isPending,
  } = useCategory(page);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Shop by category
          </h2>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Explore products across everyday categories
          </p>
        </div>

        <Link
          to="/products"
          className="group flex shrink-0 items-center gap-1 text-xs font-medium text-foreground hover:text-muted-fg transition-colors sm:text-sm"
        >
          View all
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Category cards */}
      <div>
        {categoriesError && (
          <ApiErrorUI
            message={getApiErrorMessage(
              categoriesErrorDetails,
              "Unable to load categories",
            )}
            onRetry={refetchCategories}
          />
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {isPending &&
            Array.from({ length: 6 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          {isSuccess &&
            categoriesData?.categories?.map((c) => (
              <CategoryCard key={c.slug} category={c} isPending={isPending} />
            ))}
        </div>
      </div>

      {/* Pagination */}
      {categoriesData?.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="btn btn-outline btn-sm rounded-lg h-8 px-3 text-xs disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-xs text-muted-foreground">
            Page <span className="font-semibold text-foreground">{page}</span>{" "}
            of {categoriesData?.totalPages}
          </span>
          <button
            disabled={page >= categoriesData?.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-outline btn-sm rounded-lg h-8 px-3 text-xs disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
