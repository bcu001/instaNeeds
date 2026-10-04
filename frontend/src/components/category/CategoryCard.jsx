import resizeImage from "@/lib/resizeImage";
import { Link } from "react-router";

const CategoryCard = ({ category }) => (
	<Link
		to={`/products?category=${category.slug}`}
		className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-ring hover:shadow-md text-center"
	>
		<div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-muted overflow-hidden">
			{category.imageURL ? (
				<img
					src={resizeImage(category.imageURL, 120, 70)}
					alt={category.categoryName}
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			) : (
				<span className="text-2xl">📦</span>
			)}
		</div>
		<span className="min-w-0 w-full">
			<span className="block truncate text-sm font-semibold text-foreground group-hover:text-muted-fg transition-colors">
				{category.categoryName}
			</span>
		</span>
	</Link>
);

export default CategoryCard;