import { Link } from "react-router"
import { categories } from "@/data/mockData"

const Footer = () => (
	<footer className="border-t border-base-200 bg-base-100">
		<div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<div className="flex items-center gap-2">
					<span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg text-primary-content">
						🧺
					</span>
					<span className="text-lg font-bold tracking-tight">
						insta<span className="text-primary">Needs</span>
					</span>
				</div>
				<p className="mt-3 max-w-xs text-sm text-base-content/60">
					Everything you need for the day — fresh, chilled or pronto — delivered to your door in
					about 30 minutes.
				</p>
			</div>

			<div>
				<h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50">Shop</h3>
				<ul className="mt-3 space-y-2 text-sm">
					<li><Link to="/products" className="text-base-content/70 hover:text-primary">All products</Link></li>
					{categories.slice(0, 4).map((c) => (
						<li key={c.slug}>
							<Link to={`/products?category=${c.slug}`} className="text-base-content/70 hover:text-primary">
								{c.name}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50">Support</h3>
				<ul className="mt-3 space-y-2 text-sm text-base-content/70">
					<li><span className="cursor-pointer hover:text-primary">Delivery areas</span></li>
					<li><span className="cursor-pointer hover:text-primary">Returns & refunds</span></li>
					<li><span className="cursor-pointer hover:text-primary">Help centre</span></li>
					<li><span className="cursor-pointer hover:text-primary">Contact us</span></li>
				</ul>
			</div>

			<div>
				<h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50">We’re open</h3>
				<ul className="mt-3 space-y-2 text-sm text-base-content/70">
					<li>Every day · 6 AM – 11 PM</li>
					<li>Delivery in ~30 minutes</li>
					<li className="mt-3">
						<a href="mailto:hello@instaneeds.app" className="text-primary hover:underline">
							hello@instaneeds.app
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div className="border-t border-base-200 py-5 text-center text-xs text-base-content/45">
			© 2026 instaNeeds · Crafted with daisyUI · This is a UI prototype
		</div>
	</footer>
)

export default Footer