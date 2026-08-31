import { Link, useParams } from "react-router"
// import { getProductById, getRelatedProducts } from "@/services/productService"
import ProductImage from "@/components/product/ProductImage"
import QuantityStepper from "@/components/product/QuantityStepper"
import LoadingUI from "@/components/common/LoadingUI"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/data/mockData"
import { useQuery } from "@tanstack/react-query"
import ProductNotFoundUI from "@/components/common/ProductNotFoundUI"
import { getProductById } from "@/services/product.service"

const ProductDetailPage = () => {
	const { id } = useParams()
	const { addItem, getQty, openDrawer } = useCart()
	const qty = getQty(id)

	// const [related, setRelated] = useState([])
	const checkdata = ()=> {
		console.log(data)
	};

	const {data, isPending} = useQuery({
		queryKey:["getProductById", id],
		queryFn:getProductById
	})
	const outOfStock = data?.product.stock === 0


	if (isPending) return <div className="grid min-h-[50vh] place-items-center"><LoadingUI /></div>
	if (!data?.product) return <ProductNotFoundUI/>

	// const discount = 20

	return (
		<div className="mx-auto max-w-7xl px-4 pt-8 pb-20">
			{/* breadcrumb */}
			<button className="btn" onClick={checkdata}>check</button>
			<nav className="breadcrumbs text-sm text-base-content/55" aria-label="Breadcrumb">
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/products">Products</Link></li>
					<li className="text-base-content/90">{data?.product.title}</li>
				</ul>
			</nav>

			<div className="mt-4 grid gap-8 lg:grid-cols-2">
				{/* image */}
				<div className="lg:sticky lg:top-24 lg:self-start">
					<div className="overflow-hidden rounded-box border border-base-200 bg-base-100">
						<ProductImage
							src={data?.product.imageURL}
							alt={data?.product.title}
							emoji={data?.product.emoji}
							className="aspect-square w-full"
						/>
					</div>
				</div>

				{/* info */}
				<div>
					<p className="text-xs font-semibold uppercase tracking-wider text-primary">
						{data?.product.category.replace("-", " & ")}
					</p>
					<h1 className="mt-1 text-2xl font-bold sm:text-3xl">{data?.product.title}</h1>

					<div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
						{data?.product.rating ? (
							<span className="badge gap-1 rounded-full bg-success/10 text-success">
								★ {data?.product.rating.toFixed(1)}
							</span>
						) : null}
						<span className="text-base-content/55">{data?.product.unit}</span>
						{outOfStock && <span className="badge badge-error badge-outline">Out of stock</span>}
					</div>

					<div className="mt-5 flex items-center gap-3">
						<span className="text-3xl font-extrabold">{formatPrice(data?.product.price)}</span>
						{/* {discount ? (
							<>
								<span className="text-lg text-base-content/40 line-through">
									{formatPrice(Math.round(data?.product.price / (1 - discount / 100)))}
								</span>
								<span className="badge badge-error">{discount}% OFF</span>
							</>
						) : null} */}
					</div>

					<p className="mt-5 leading-relaxed text-base-content/75">{data?.product.description}</p>

					{/* quantity + add */}
					<div className="mt-7 flex flex-wrap items-center gap-3">
						{qty > 0 ? (
							<QuantityStepper productId={data?.product._id} size="lg" />
						) : (
							<button
								type="button"
								disabled={outOfStock}
								className="btn btn-primary h-11 rounded-full px-8"
								onClick={() => {
									addItem(data?.product)
									openDrawer()
								}}
							>
								Add to cart · {formatPrice(data?.product.price)}
							</button>
						)}

						{qty > 0 && (
							<button type="button" onClick={openDrawer} className="btn btn-outline h-11 rounded-full px-6">
								Go to cart →
							</button>
						)}
					</div>

					{/* delivery chip */}
					<div className="mt-6 flex flex-wrap gap-3">
						<span className="inline-flex items-center gap-2 rounded-full border border-base-200 px-3 py-1.5 text-xs text-base-content/70">
							⚡ Delivery in ~30 min
						</span>
						<span className="inline-flex items-center gap-2 rounded-full border border-base-200 px-3 py-1.5 text-xs text-base-content/70">
							🔒 100% payment protection
						</span>
						<span className="inline-flex items-center gap-2 rounded-full border border-base-200 px-3 py-1.5 text-xs text-base-content/70">
							↩️ Easy returns
						</span>
					</div>
				</div>
			</div>

			{/* related */}
			{/* {related.length > 0 && (
				<section className="mt-16">
					<div className="flex items-end justify-between">
						<h2 className="text-xl font-bold">You may also like</h2>
						<Link to={`/products?category=${data?.product.category}`} className="btn btn-ghost btn-sm text-primary">
							More in this category →
						</Link>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
						{related.map((p) => (
							<ProductCard key={p._id} product={p} />
						))}
					</div>
				</section>
			)} */}
		</div>
	)
}

export default ProductDetailPage