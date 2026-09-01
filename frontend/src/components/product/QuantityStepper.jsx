import useCartContext from "@/hooks/useCartContext"

const QuantityStepper = ({ productId, size = "sm" }) => {
	const {getQty, addToCart, removeFromCart} = useCartContext()
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
				onClick={() => removeFromCart(productId)}
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
				onClick={() => addToCart(productId)}
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