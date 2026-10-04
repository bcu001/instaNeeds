import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        404
      </span>
      <h1 className="mt-3 text-lg font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary mt-6 h-9 px-5 rounded-lg text-sm font-medium shadow-xs"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
