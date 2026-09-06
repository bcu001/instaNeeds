import { Link, useParams } from "react-router"
// import { getProductById, getRelatedProducts } from "@/services/productService"
import ProductImage from "@/components/product/ProductImage"
import QuantityStepper from "@/components/product/QuantityStepper"
import LoadingUI from "@/components/common/LoadingUI"
import { formatPrice } from "@/data/mockData"
import ProductNotFoundUI from "@/components/common/ProductNotFoundUI"
import useCategoryById from "@/hooks/useCategoryById"
import useProductById from "@/hooks/useProductById"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import useCartContext from "@/hooks/useCartContext"
import resizeImage from "@/lib/resizeImage"
import ApiErrorUI from "@/components/common/ApiErrorUI"
import { getApiErrorMessage } from "@/lib/apiError"

const ProductDetailPage = () => {
	useDocumentTitle("Product | InstaNeeds");
	const { id } = useParams()
	const {addToCart, getQty, openDrawer} = useCartContext();
	const qty = getQty(id)
	// const [related, setRelated] = useState([])
	// const discount = 20

	const {data:productData, isPending, isError, error, refetch} = useProductById(id);
	const {data:categoryData} = useCategoryById(productData?.product.category)

	const outOfStock = productData?.product.stock === 0

	if (isPending) return <div className="grid min-h-[50vh] place-items-center"><LoadingUI /></div>
	if (isError) return <ApiErrorUI message={getApiErrorMessage(error, "Unable to load product")} onRetry={refetch} />
	if (!productData?.product) return <ProductNotFoundUI/>

	return (
		<div className="mx-auto max-w-7xl px-4 pt-8 pb-20">
			{/* breadcrumb */}
			<nav className="breadcrumbs text-sm text-base-content/55" aria-label="Breadcrumb">
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/products">Products</Link></li>
					<li className="text-base-content/90">{productData?.product.title}</li>
				</ul>
			</nav>

			<div className="mt-4 grid gap-8 lg:grid-cols-2">
				{/* image */}
				<div className="lg:sticky lg:top-24 lg:self-start">
					<div className="overflow-hidden rounded-box border border-base-200 bg-base-100">
						<ProductImage
							src={resizeImage(productData?.product.imageURL,800,70)}
							alt={productData?.product.title}
							emoji={productData?.product.emoji}
							className="aspect-square w-full"
						/>
					</div>
				</div>

				{/* info */}
				<div>
					<p className="text-xs font-semibold uppercase tracking-wider text-primary">
						{categoryData?.category?.categoryName}
					</p>
					<h1 className="mt-1 text-2xl font-bold sm:text-3xl">{productData?.product.title}</h1>

					<div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
						{productData?.product.rating ? (
							<span className="badge gap-1 rounded-full bg-success/10 text-success">
								★ {productData?.product.rating.toFixed(1)}
							</span>
						) : null}
						<span className="text-base-content/55">{productData?.product.unit}</span>
						{outOfStock && <span className="badge badge-error badge-outline">Out of stock</span>}
					</div>

					<div className="mt-5 flex items-center gap-3">
						<span className="text-3xl font-extrabold">{formatPrice(productData?.product.price)}</span>
						{/* {discount ? (
							<>
								<span className="text-lg text-base-content/40 line-through">
									{formatPrice(Math.round(productData?.product.price / (1 - discount / 100)))}
								</span>
								<span className="badge badge-error">{discount}% OFF</span>
							</>
						) : null} */}
					</div>

					<p className="mt-5 leading-relaxed text-base-content/75">{productData?.product.description}</p>

					{/* quantity + add */}
					<div className="mt-7 flex flex-wrap items-center gap-3">
						{qty > 0 ? (
							<QuantityStepper productId={productData?.product._id} size="lg" />
						) : (
							<button
								type="button"
								disabled={outOfStock}
								className="btn btn-primary h-11 rounded-full px-8"
								onClick={() => {
									addToCart(productData?.product._id)
									openDrawer()
								}}
							>
								Add to cart · {formatPrice(productData?.product.price)}
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
						<Link to={`/products?category=${productData?.product.category}`} className="btn btn-ghost btn-sm text-primary">
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