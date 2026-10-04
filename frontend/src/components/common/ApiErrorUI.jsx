const ApiErrorUI = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center my-6 space-y-3">
      <p className="text-sm font-medium text-destructive">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-outline h-8 px-4 text-xs rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ApiErrorUI;
