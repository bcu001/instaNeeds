import { Link } from "react-router";
import ProductImage from "./ProductImage";
import QuantityStepper from "./QuantityStepper";
import { formatPrice } from "@/data/mockData";
import useCategoryById from "@/hooks/useCategoryById";
import useCartContext from "@/hooks/useCartContext";
import resizeImage from "@/lib/resizeImage";
import ProductCardSKeleton from "../SkeletonLoaders/ProductCardSkeleton";

const ProductCard = ({ product, isPending = false }) => {
  const { addToCart, isProdcutInCart } = useCartContext();
  const inCart = isProdcutInCart(product._id);
  const { data: categoryData, isSuccess } = useCategoryById(product.category);

  if (isPending) return <ProductCardSKeleton />;

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-ring hover:shadow-md overflow-hidden">
      <Link
        to={`/products/${product._id}`}
        className="relative block overflow-hidden bg-muted aspect-[1/0.9]"
      >
        {isSuccess && categoryData?.category && (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full border border-border/70 bg-background/90 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-xs shadow-xs">
            {categoryData.category.categoryName}
          </span>
        )}
        <ProductImage
          src={resizeImage(product.imageURL, 400, 65)}
          alt={product.title}
          emoji={product.emoji}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:p-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Link to={`/products/${product._id}`} className="block">
              <h3
                className="line-clamp-2 text-sm font-semibold text-foreground transition-colors hover:text-muted-fg"
                title={product.title}
              >
                {product.title}
              </h3>
            </Link>
            <span className="shrink-0 text-sm font-semibold text-foreground whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
          {product.unit && (
            <p className="text-xs text-muted-foreground">{product.unit}</p>
          )}
        </div>

        <div className="pt-1">
          {inCart ? (
            <QuantityStepper productId={product._id} />
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product._id)}
              className="btn btn-outline w-full h-9 rounded-lg text-xs sm:text-sm font-medium border-border hover:bg-muted text-foreground transition-all shadow-xs"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
