import { Link } from "react-router"

const PageNotFound = () => {
  return (
    <div>
      <div>Page Not Found 404</div>
      <Link className="btn btn-primary" to={`/`}>Go to Home</Link>
    </div>
  )
}

export default PageNotFound
