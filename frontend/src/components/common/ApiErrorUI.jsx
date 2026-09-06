const ApiErrorUI = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="grid place-items-center gap-3 py-16 text-center">
      <p className="text-error">{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="btn btn-outline btn-sm">Try again</button>}
    </div>
  )
}

export default ApiErrorUI
