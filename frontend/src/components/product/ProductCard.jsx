import { Link } from "react-router"
import ProductImage from "./ProductImage"
import QuantityStepper from "./QuantityStepper"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/data/mockData"
import useCategoryById from "@/hooks/useCategoryById"

const ProductCard = ({ product }) => {
	const { addItem, isInCart } = useCart()
	const inCart = isInCart(product._id)
	
	const {data:categoryData, isSuccess} = useCategoryById(product.category);

	return (
		<div className="group card overflow-hidden rounded-box border border-base-200 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-base-300 hover:shadow-md">
			<Link to={`/products/${product._id}`} className="relative block">
				<figure className="aspect-square overflow-hidden">
					<ProductImage
						src={product.imageURL}
						alt={product.title}
						emoji={product.emoji}
						className="h-full w-full transition duration-300 group-hover:scale-105"
					/>
				</figure>
				{product.offer ? (
					<span className="absolute left-2 top-2 badge badge-error badge-sm text-xs">
						{product.offer}% OFF
					</span>
				) : null}
			</Link>

			<div className="flex flex-1 flex-col gap-1 p-3">
				{isSuccess && <p className="text-[11px] font-medium uppercase tracking-wider text-base-content/50">
					{categoryData?.category.categoryName}
				</p>}
				<Link to={`/products/${product._id}`}>
					<h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary">
						{product.title}
					</h3>
				</Link>
				<p className="text-xs text-base-content/60">{product.unit}</p>

				<div className="mt-2 flex items-center justify-between gap-2">
					<div className="flex items-baseline gap-1.5">
						<span className="text-base font-bold">{formatPrice(product.price)}</span>
						{product.offer ? (
							<span className="text-xs text-base-content/40 line-through">
								{formatPrice(Math.round(product.price / (1 - product.offer / 100)))}
							</span>
						) : null}
					</div>

					{inCart ? (
						<QuantityStepper productId={product._id} />
					) : (
						<button
							type="button"
							onClick={() => addItem(product)}
							className="btn btn-primary btn-sm h-8 min-h-8 rounded-full px-4"
						>
							Add
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductCard