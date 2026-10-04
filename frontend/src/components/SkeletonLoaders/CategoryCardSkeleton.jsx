const CategoryCardSkeleton = () => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 animate-pulse">
    <div className="h-14 w-14 rounded-lg bg-muted" />
    <div className="h-4 bg-muted rounded-md w-16" />
  </div>
);

export default CategoryCardSkeleton;
