import resizeImage from "@/lib/resizeImage"
import { Link } from "react-router"

const CategoryCard = ({ category }) => (
	<Link
		to={`/products?category=${category.slug}`}
		className="card flex-col items-center gap-4 rounded-box border border-base-200 bg-base-100 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
	>
		<img src={resizeImage(category.imageURL)} loading="lazy" className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/15 to-accent/15 text-3xl"/>
		<span className="min-w-0">
			<span className="block truncate text-sm font-semibold">{category.categoryName}</span>
		</span>
	</Link>
)

export default CategoryCard