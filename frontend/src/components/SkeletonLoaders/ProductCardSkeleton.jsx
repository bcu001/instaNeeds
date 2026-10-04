const ProductCardSKeleton = () => {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-xs animate-pulse">
      <div className="aspect-[1/0.9] bg-muted w-full" />
      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:p-4">
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-md w-3/4" />
          <div className="h-3 bg-muted rounded-md w-1/2" />
        </div>
        <div className="pt-2">
          <div className="h-9 bg-muted rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSKeleton;
