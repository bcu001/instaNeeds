const ProductCardSKeleton = () => {
	return (
		<div className="group card overflow-hidden rounded-box border border-base-200 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-base-300 hover:shadow-md animate-pulse">
			<div className="relative block bg-neutral-300">
				<figure className="aspect-square overflow-hidden">
					<div
						className="h-full w-full transition duration-300 group-hover:scale-105"
					/>
				</figure>
			</div>
			<div className="flex flex-1 flex-col gap-1 p-3 justify-between">
				<p className="h-4 bg-neutral-300 rounded-full "/>
				<div >
					<h3 className="h-4 bg-neutral-300 rounded-full"/>
				</div>
				<div className="mt-2 flex items-center justify-between gap-2">
					<div className="flex items-baseline gap-1.5">
						<span className="text-xs md:text-base font-bold h-4 bg-neutral-300 rounded-full w-12"/>
					</div>
					<div>
						<div className="h-4 bg-neutral-300 rounded-full w-12"/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCardSKeleton