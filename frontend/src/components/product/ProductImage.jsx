const ProductImage = ({ src, alt = "", emoji = "🛍️", className = "" }) => {
	if (!src) {
		return (
			<div
				className={`grid place-items-center bg-muted text-muted-foreground ${className}`}
				role="img"
				aria-label={alt}
			>
				<span className="text-5xl opacity-90 transition-transform duration-300 group-hover:scale-110">
					{emoji}
				</span>
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={alt}
			loading="lazy"
			className={`object-cover bg-muted transition-transform duration-300 group-hover:scale-105 ${className}`}
		/>
	);
};

export default ProductImage;