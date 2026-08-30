import { Link } from "react-router"

const ProductNotFoundUI = () => {
  return (
    <div className="mx-auto grid max-w-7xl place-items-center px-4 py-24 text-center">
        <div>
            <p className="text-6xl">🧐</p>
            <h1 className="mt-4 text-xl font-bold">Product not found</h1>
            <p className="mt-1 text-sm text-base-content/55">It may have been moved or is out of stock.</p>
            <Link to="/products" className="btn btn-primary btn-sm mt-5 rounded-full">Browse products</Link>
        </div>
    </div>
  )
}

export default ProductNotFoundUI
