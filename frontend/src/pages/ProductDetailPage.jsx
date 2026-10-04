import { Link, useParams } from "react-router";
import { useEffect } from "react";
import ProductImage from "@/components/product/ProductImage";
import QuantityStepper from "@/components/product/QuantityStepper";
import { formatPrice } from "@/data/mockData";
import ProductNotFoundUI from "@/components/common/ProductNotFoundUI";
import useCategoryById from "@/hooks/useCategoryById";
import useProductById from "@/hooks/useProductById";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useCartContext from "@/hooks/useCartContext";
import resizeImage from "@/lib/resizeImage";
import ApiErrorUI from "@/components/common/ApiErrorUI";
import { getApiErrorMessage } from "@/lib/apiError";
import ProductDetailPageSkeleton from "@/components/SkeletonLoaders/ProductDetailPageSkeleton";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

const ProductDetailPage = () => {
  useDocumentTitle("Product | InstaNeeds");
  const { id } = useParams();
  const { addToCart, getQty, openDrawer } = useCartContext();
  const qty = getQty(id);
  const {
    data: productData,
    isPending,
    isError,
    error,
    refetch,
  } = useProductById(id);
  const { data: categoryData } = useCategoryById(
    productData?.product?.category,
  );

  const outOfStock = productData?.product?.stock === 0;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (isPending) return <ProductDetailPageSkeleton />;
  if (isError)
    return (
      <ApiErrorUI
        message={getApiErrorMessage(error, "Unable to load product")}
        onRetry={refetch}
      />
    );
  if (!productData?.product) return <ProductNotFoundUI />;

  const product = productData.product;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-20 sm:px-6">
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link
          to="/products"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <ChevronRight size={13} />
        <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
          {product.title}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Product image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
            <ProductImage
              src={resizeImage(product.imageURL, 800, 75)}
              alt={product.title}
              emoji={product.emoji}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-between">
          <div>
            {categoryData?.category && (
              <span className="inline-block rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground mb-3">
                {categoryData.category.categoryName}
              </span>
            )}

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {product.rating ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(1)}
                </span>
              ) : null}

              {product.unit && (
                <span className="text-xs text-muted-foreground">
                  {product.unit}
                </span>
              )}

              {outOfStock && (
                <span className="rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                  Out of stock
                </span>
              )}
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="mt-5 leading-relaxed text-sm text-muted-foreground">
              {product.description ||
                "Fresh everyday staple selected and inspected for high quality. Packed hygienically and delivered fast to your doorstep."}
            </p>

            {/* Add to cart / Stepper */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {qty > 0 ? (
                <QuantityStepper productId={product._id} size="lg" />
              ) : (
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => {
                    addToCart(product._id);
                    openDrawer();
                  }}
                  className="btn btn-primary h-10 px-6 rounded-lg text-sm font-medium shadow-xs disabled:opacity-50"
                >
                  Add to cart · {formatPrice(product.price)}
                </button>
              )}

              {qty > 0 && (
                <button
                  type="button"
                  onClick={openDrawer}
                  className="btn btn-outline h-10 px-5 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground"
                >
                  View cart →
                </button>
              )}
            </div>

            {/* Benefits chips */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-t border-border pt-6">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                <Truck size={16} className="text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">
                  ~10–30 min delivery
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                <ShieldCheck
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
                <span className="text-xs text-muted-foreground">
                  100% genuine
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                <RotateCcw
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
                <span className="text-xs text-muted-foreground">
                  Instant refund
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
