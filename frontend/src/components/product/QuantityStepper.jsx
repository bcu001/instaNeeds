import { useCart } from "@/context/CartContext"

/**
 * Compact +/- stepper used on cards and in the cart.
 */
const QuantityStepper = ({ productId, size = "sm" }) => {
	const { getQty, updateQty } = useCart()
	const qty = getQty(productId)

	return (
		<div
			className={`flex items-center rounded-full border border-base-300 bg-base-100 ${
				size === "lg" ? "h-11" : "h-8"
			}`}
		>
			<button
				type="button"
				aria-label="Decrease quantity"
				onClick={() => updateQty(productId, -1)}
				className={`grid place-items-center rounded-full text-base-content/70 transition hover:bg-base-200 ${
					size === "lg" ? "h-11 w-11" : "h-8 w-8"
				}`}
			>
				−
			</button>
			<span className={`min-w-6 text-center font-semibold ${size === "lg" ? "" : "text-sm"}`}>
				{qty}
			</span>
			<button
				type="button"
				aria-label="Increase quantity"
				onClick={() => updateQty(productId, 1)}
				className={`grid place-items-center rounded-full text-base-content/70 transition hover:bg-base-200 ${
					size === "lg" ? "h-11 w-11" : "h-8 w-8"
				}`}
			>
				+
			</button>
		</div>
	)
}

export default QuantityStepper