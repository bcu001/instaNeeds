import { Link, useNavigate } from "react-router"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/data/mockData"
import ProductImage from "@/components/product/ProductImage"
import QuantityStepper from "@/components/product/QuantityStepper"
import useCartContext from "@/hooks/useCartContext"

const FREE_DELIVERY_ABOVE = 199
const DELIVERY_FEE = 39

const CartDrawer = () => {
	const { items, isDrawerOpen, closeDrawer, removeItem, subtotal, itemCount } = useCart()
	const {cart, addToCart, removeFromCart, isDrawerOpen:isDrawerOpenV2, openDrawer, closeDrawer:closeDrawerV2} = useCartContext();
	const navigate = useNavigate()

	if (!isDrawerOpen) return null

	const go = (path) => {
		closeDrawer()
		navigate(path)
	}

	return (
		<div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
			<div
				className="absolute inset-0 bg-base-content/40 backdrop-blur-[2px]"
				onClick={closeDrawer}
				aria-hidden
			/>
			<div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-base-200 bg-base-100 shadow-2xl">
				{/* header */}
				<div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
					<h2 className="text-base font-bold">Your cart {itemCount > 0 && <span className="text-base-content/50">· {itemCount} item{itemCount > 1 ? "s" : ""}</span>}</h2>
					<button type="button" onClick={closeDrawer} className="btn btn-ghost btn-sm btn-circle" aria-label="Close cart">
						✕
					</button>
				</div>

				{/* body */}
				{items.length === 0 ? (
					<div className="grid flex-1 place-items-center px-6 text-center">
						<div>
							<p className="text-6xl">🛒</p>
							<h3 className="mt-4 text-base font-semibold">Your cart is empty</h3>
							<p className="mt-1 text-sm text-base-content/55">
								Add something fresh to get started.
							</p>
							<button
								type="button"
								onClick={() => go("/products")}
								className="btn btn-primary mt-5 rounded-full"
							>
								Start shopping
							</button>
						</div>
					</div>
				) : (
					<>
						<ul className="flex-1 divide-y divide-base-200 overflow-y-auto px-5">
							{items.map((i) => (
								<li key={i._id} className="flex items-center gap-3 py-4">
									<Link to={`/products/${i._id}`} onClick={closeDrawer} className="shrink-0">
										<ProductImage src={i.imageURL} alt={i.title} emoji={i.emoji} className="h-16 w-16 rounded-lg" />
									</Link>
									<div className="min-w-0 flex-1">
										<Link
											to={`/products/${i._id}`}
											onClick={closeDrawer}
											className="block truncate text-sm font-semibold hover:text-primary"
										>
											{i.title}
										</Link>
										<p className="text-xs text-base-content/55">
											{formatPrice(i.price)} · {i.unit}
										</p>
									</div>
									<div className="flex flex-col items-end gap-1">
										<QuantityStepper productId={i._id} />
										<button
											type="button"
											onClick={() => removeItem(i._id)}
											className="text-xs text-base-content/45 underline-offset-2 hover:text-error hover:underline"
										>
											Remove
										</button>
									</div>
								</li>
							))}
						</ul>

						{/* free delivery nudge */}
						<div className="px-5 pt-3">
							<div className="rounded-box bg-base-200 px-3 py-2 text-xs text-base-content/70">
								{subtotal >= FREE_DELIVERY_ABOVE ? (
									<>🎉 Free delivery unlocked</>
								) : (
									<>Add {formatPrice(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery</>
								)}
							</div>
						</div>

						{/* footer */}
						<div className="border-t border-base-200 px-5 py-4">
							<div className="flex items-baseline justify-between">
								<span className="text-sm text-base-content/60">Subtotal</span>
								<span className="text-lg font-bold">{formatPrice(subtotal)}</span>
							</div>
							<div className="mt-4 grid grid-cols-2 gap-3">
								<button type="button" onClick={() => go("/cart")} className="btn rounded-full">
									View cart
								</button>
								<button type="button" onClick={() => go("/checkout")} className="btn btn-primary rounded-full">
									Checkout
								</button>
							</div>
							<p className="mt-3 text-center text-[11px] text-base-content/40">
								Delivery in ~30 minutes · {DELIVERY_FEE >= 0 ? `₹${DELIVERY_FEE} fee under ${formatPrice(FREE_DELIVERY_ABOVE)}` : "Free delivery"}
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default CartDrawer