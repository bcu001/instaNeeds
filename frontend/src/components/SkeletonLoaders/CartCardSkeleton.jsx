const CartCardSkeleton = () => {
  return (
    <li className="flex items-center gap-3 py-3 border-b border-border animate-pulse last:border-b-0">
      <div className="shrink-0 rounded-lg size-14 bg-muted" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 rounded-md bg-muted w-3/4" />
        <div className="h-3 rounded-md bg-muted w-1/3" />
      </div>
      <div className="h-9 w-24 rounded-lg bg-muted shrink-0" />
    </li>
  );
};

export default CartCardSkeleton;
