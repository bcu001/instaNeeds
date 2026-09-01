import { Link } from "react-router"
import { categories } from "@/data/mockData"
import { ShoppingCart } from "lucide-react"
import { Search } from "lucide-react"
import { Menu } from "lucide-react"
import useCartContext from "@/hooks/useCartContext"

const Navbar = () => {
	const {cartData, openDrawer} = useCartContext();

	return (
		<header className="sticky top-0 z-40 border-b border-base-200 bg-base-100/90 backdrop-blur">
			<div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
				
				<Link to="/" className="flex shrink-0 items-center gap-2">
					<span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg text-primary-content">
						🧺
					</span>
					<span className="text-lg font-bold tracking-tight">
						insta<span className="text-primary">Needs</span>
					</span>
				</Link>

				{/* desktop search */}
				<nav className="ml-auto flex items-center gap-1.5 sm:gap-2">
					<Link className="btn btn-ghost btn-circle relative text-base-content" to={`/products`}> <Search/> </Link>
					<button
						type="button"
						onClick={openDrawer}
						className="btn btn-ghost btn-circle relative text-base-content"
						aria-label={`Open cart, ${cartData?.totalItems} items`}
					>
						<ShoppingCart />
						{cartData?.totalItems > 0 ? (
							<span className="badge badge-primary absolute -right-0.5 -top-0.5 badge-sm min-w-5 p-1 text-[10px]">
								{cartData?.totalItems}
							</span>
						) : null}
					</button>

					{/* mobile menu */}
					<div className="dropdown dropdown-end md:hidden">
						<button className="btn btn-ghost btn-circle text-base-content" aria-label="Menu"> <Menu/> </button>
						<ul className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/products">Shop all</Link></li>
							<li className="menu-title mt-2">Categories</li>
							{categories.map((c) => (
								<li key={c.slug}>
									<Link to={`/products?category=${c.slug}`}>
										{c.emoji} {c.name}
									</Link>
								</li>
							))}
							<li className="mt-2"><Link to="/cart">🛒 My cart</Link></li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Navbar