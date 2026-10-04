import { Link } from "react-router";

const ProductNotFoundUI = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-5xl">🧐</p>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        Product not found
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        It may have been removed, renamed, or is currently out of stock.
      </p>
      <Link
        to="/products"
        className="btn btn-primary h-9 px-5 rounded-lg text-xs font-medium mt-5 shadow-xs"
      >
        Browse all products
      </Link>
    </div>
  );
};

export default ProductNotFoundUI;
