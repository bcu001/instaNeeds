const CategoryCardSkeleton = () => (
	<div
		className="card flex-col items-center gap-4 rounded-box border border-base-200 p-4 animate-pulse"
	>
		<div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-neutral-300"/>
		<span className="min-w-0">
			<span className="block h-4 bg-neutral-300 rounded-full w-20"/>
		</span>
	</div>
)

export default CategoryCardSkeleton