import { useNavigate } from "react-router"
// import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/data/mockData"
// import ProductImage from "@/components/product/ProductImage"
// import QuantityStepper from "@/components/product/QuantityStepper"
import useCartContext from "@/hooks/useCartContext"
import CartCard from "./CartCard"

const FREE_DELIVERY_ABOVE = 199
const DELIVERY_FEE = 39

const CartDrawer = () => {
	// const { items, isDrawerOpen, closeDrawer, removeItem, subtotal, itemCount } = useCart()
	const {cartData, isDrawerOpen, closeDrawer, isLoading} = useCartContext();
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
					<h2 className="text-base font-bold">Your cart {cartData?.totalItems > 0 && <span className="text-base-content/50">· {cartData?.totalItems} item{cartData?.totalItems > 1 ? "s" : ""}</span>}</h2>
					<button type="button" onClick={closeDrawer} className="btn btn-ghost btn-sm btn-circle" aria-label="Close cart">
						✕
					</button>
				</div>

				{/* body */}
				{cartData?.cart?.items.length === 0 ? (
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
							{!isLoading && cartData?.cart?.items.map((i) => <CartCard item={i} key={i.productId}/>)}
						</ul>

						{/* free delivery nudge */}
						<div className="px-5 pt-3">
							<div className="rounded-box bg-base-200 px-3 py-2 text-xs text-base-content/70">
								{cartData?.totalPrice >= FREE_DELIVERY_ABOVE ? (
									<>🎉 Free delivery unlocked</>
								) : (
									<>Add {formatPrice(FREE_DELIVERY_ABOVE - cartData?.totalPrice)} more for free delivery</>
								)}
							</div>
						</div>

						{/* footer */}
						<div className="border-t border-base-200 px-5 py-4">
							<div className="flex items-baseline justify-between">
								<span className="text-sm text-base-content/60">subtotal</span>
								<span className="text-lg font-bold">{formatPrice(cartData?.totalPrice)}</span>
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