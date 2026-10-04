const NoSearchResultUI = ({ reset }) => {
  return (
    <div className="col-span-full grid place-items-center rounded-xl border border-dashed border-border bg-card/50 py-20 px-4 text-center">
      <div>
        <p className="text-4xl">🫥</p>
        <h3 className="mt-3 text-base font-semibold text-foreground">
          No products found
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-xs">
          Try a different search term or clear the active filter.
        </p>
        {reset && (
          <button
            type="button"
            className="btn btn-outline h-8 px-4 text-xs rounded-lg mt-4 border-border hover:bg-muted text-foreground"
            onClick={() => reset()}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default NoSearchResultUI;
