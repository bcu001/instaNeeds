import { Link, useNavigate } from "react-router"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/data/mockData"
import ProductImage from "@/components/product/ProductImage"
import QuantityStepper from "@/components/product/QuantityStepper"
import useDocumentTitle from "@/hooks/useDocumentTitle"

const FREE_DELIVERY_ABOVE = 199
const DELIVERY_FEE = 39

const CartPage = () => {
	useDocumentTitle("Cart | InstaNeeds");
	const { items, updateQty, removeItem, clearCart, subtotal, itemCount } = useCart()
	const navigate = useNavigate()

	const deliveryFee = items.length === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
	const total = subtotal + deliveryFee

	if (items.length === 0) {
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
				<button
					type="button"
					onClick={clearCart}
					className="btn btn-ghost btn-sm text-base-content/55 hover:text-error"
				>
					Clear cart
				</button>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
				{/* items */}
				<ul className="divide-y divide-base-200 rounded-box border border-base-200 bg-base-100">
					{items.map((i) => (
						<li key={i._id} className="flex items-center gap-4 p-4">
							<Link to={`/products/${i._id}`} className="shrink-0">
								<ProductImage
									src={i.imageURL}
									alt={i.title}
									emoji={i.emoji}
									className="h-20 w-20 rounded-box"
								/>
							</Link>

							<div className="min-w-0 flex-1">
								<Link
									to={`/products/${i._id}`}
									className="block truncate text-sm font-semibold hover:text-primary"
								>
									{i.title}
								</Link>
								<p className="text-xs text-base-content/55">
									{formatPrice(i.price)} · {i.unit}
								</p>
								<p className="mt-0.5 text-xs text-base-content/45">
									In stock · <button type="button" onClick={() => removeItem(i._id)} className="text-error/80 underline-offset-2 hover:underline">Remove</button>
								</p>
							</div>

							<div className="flex flex-col items-end gap-2">
								<QuantityStepper productId={i._id} size="lg" />
								<span className="text-sm font-bold">{formatPrice(i.price * i.qty)}</span>
							</div>
						</li>
					))}
				</ul>

				{/* summary */}
				<aside className="h-fit rounded-box border border-base-200 bg-base-100 p-5 lg:sticky lg:top-24">
					<h2 className="text-base font-bold">Order summary</h2>
					<dl className="mt-4 space-y-2.5 text-sm">
						<div className="flex justify-between">
							<dt className="text-base-content/60">Subtotal ({itemCount} item{itemCount > 1 ? "s" : ""})</dt>
							<dd className="font-medium">{formatPrice(subtotal)}</dd>
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

					{subtotal < FREE_DELIVERY_ABOVE ? (
						<p className="mt-3 rounded-box bg-base-200 px-3 py-2 text-xs text-base-content/70">
							Add {formatPrice(FREE_DELIVERY_ABOVE - subtotal)} more to unlock free delivery 🎉
						</p>
					) : (
						<p className="mt-3 rounded-box bg-success/10 px-3 py-2 text-xs text-success">
							🎉 You’ve unlocked free delivery
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