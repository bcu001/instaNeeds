import useDocumentTitle from "@/hooks/useDocumentTitle"

const ProductDetailPageSkeleton = () => {
	useDocumentTitle("Product | InstaNeeds");
	return (
		<div className="mx-auto max-w-7xl px-4 pt-8 pb-20 animate-pulse">
			<nav className="breadcrumbs bg-neutral-300 rounded-full" aria-label="Breadcrumb">
			</nav>

			<div className="mt-4 grid gap-8 lg:grid-cols-2">
				<div className="lg:sticky lg:top-24 lg:self-start">
					<div className="overflow-hidden rounded-box border border-base-200 bg-base-100">
						<div className="aspect-square w-full bg-neutral-300" />
					</div>
				</div>
				<div>
					<div>
						<p className="mt-5 leading-relaxed text-base-content/75 h-4 bg-neutral-300 rounded-full"/>
						<p className="mt-1 leading-relaxed text-base-content/75 h-4 bg-neutral-300 rounded-full"/>
					</div>
					<div className="mt-7 flex flex-wrap items-center gap-3">
						<div className="bg-neutral-300 w-30 h-11 rounded-md px-8 mb-30"/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailPageSkeleton