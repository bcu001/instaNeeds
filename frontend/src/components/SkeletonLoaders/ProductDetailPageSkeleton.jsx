import useDocumentTitle from "@/hooks/useDocumentTitle";

const ProductDetailPageSkeleton = () => {
  useDocumentTitle("Product | InstaNeeds");
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-20 animate-pulse sm:px-6">
      <div className="h-4 bg-muted rounded-md w-48 mb-6" />

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-square w-full bg-muted" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded-md w-24" />
          <div className="h-8 bg-muted rounded-md w-3/4" />
          <div className="h-4 bg-muted rounded-md w-32" />
          <div className="h-7 bg-muted rounded-md w-28 mt-4" />
          <div className="space-y-2 pt-4">
            <div className="h-3.5 bg-muted rounded-md w-full" />
            <div className="h-3.5 bg-muted rounded-md w-5/6" />
            <div className="h-3.5 bg-muted rounded-md w-2/3" />
          </div>
          <div className="h-10 bg-muted rounded-lg w-40 mt-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageSkeleton;
