const ProductImage = ({ src, alt = "", emoji = "🛍️", className = "" }) => {
	if (!src) {
		return (
			<div
				className={`grid place-items-center bg-linear-to-br from-primary/15 via-secondary/10 to-accent/20 ${className}`}
				role="img"
				aria-label={alt}
			>
				<span className="text-5xl drop-shadow-sm">{emoji}</span>
			</div>
		)
	}

	return <img src={src} alt={alt} loading="lazy"  className={`object-cover ${className}`} />
}

export default ProductImage