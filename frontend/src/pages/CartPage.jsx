import { Link, useNavigate } from "react-router"
import { formatPrice } from "@/data/mockData"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import useCartContext from "@/hooks/useCartContext"
import CartCard from "@/components/cart/CartCard"

const FREE_DELIVERY_ABOVE = 199
const DELIVERY_FEE = 39

const CartPage = () => {
	useDocumentTitle("Cart | InstaNeeds");
	const {cartData} = useCartContext();
	const navigate = useNavigate()

	const deliveryFee = cartData?.cart?.items.length === 0 || cartData?.totalPrice >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
	const total = cartData?.totalPrice + deliveryFee

	if (cartData?.cart?.items.length === 0) {
		return (
			<div className="mx-auto grid place-items-center px-4 py-24 text-center">
				<div>
					<p className="text-7xl">🛒</p>
					<h1 className="mt-5 text-2xl font-bold">Your cart is empty</h1>
					<p className="mt-2 text-sm text-base-content/55">
						Looks like you haven’t added anything yet. Let’s fix that.
					</p>
					<Link to="/products" className="btn btn-primary mt-6 rounded-full px-6">
						Start shopping
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 pt-8 pb-20">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="text-2xl font-bold">Your cart</h1>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
				<ul className="divide-y divide-base-200 rounded-box border border-base-200 bg-base-100">
					{cartData?.cart?.items.map((i) => <CartCard item={i}/>
					)}
				</ul>

				{/* summary */}
				<aside className="h-fit rounded-box border border-base-200 bg-base-100 p-5 lg:sticky lg:top-24">
					<h2 className="text-base font-bold">Order summary</h2>
					<dl className="mt-4 space-y-2.5 text-sm">
						<div className="flex justify-between">
							<dt className="text-base-content/60">cartData?.totalPrice ({cartData?.totalItems} item{cartData?.totalItems > 1 ? "s" : ""})</dt>
							<dd className="font-medium">{formatPrice(cartData?.totalPrice)}</dd>
						</div>
						<div className="flex justify-between">
							<dt className="text-base-content/60">Delivery fee</dt>
							<dd className="font-medium">{deliveryFee === 0 ? <span className="text-success">FREE</span> : formatPrice(deliveryFee)}</dd>
						</div>
						<div className="flex justify-between border-t border-dashed border-base-300 pt-3 text-base">
							<dt className="font-bold">Total</dt>
							<dd className="font-extrabold">{formatPrice(total)}</dd>
						</div>
					</dl>

					{cartData?.totalPrice < FREE_DELIVERY_ABOVE ? (
						<p className="mt-3 rounded-box bg-base-200 px-3 py-2 text-xs text-base-content/70">
							Add {formatPrice(FREE_DELIVERY_ABOVE - cartData?.totalPrice)} more to unlock free delivery
						</p>
					) : (
						<p className="mt-3 rounded-box bg-success/10 px-3 py-2 text-xs text-success">
							You’ve unlocked free delivery
						</p>
					)}

					<button
						type="button"
						onClick={() => navigate("/checkout")}
						className="btn btn-primary mt-5 w-full rounded-full"
					>
						Proceed to checkout
					</button>
					<Link to="/products" className="btn btn-ghost mt-2 w-full text-base-content/60">
						Continue shopping
					</Link>
				</aside>
			</div>
		</div>
	)
}

export default CartPage