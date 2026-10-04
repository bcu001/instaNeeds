import { Link } from "react-router";
import { categories } from "@/data/mockData";
import Logo from "./Logo";

const Footer = () => (
	<footer className="mt-16 border-t border-border bg-background">
		<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<Logo/>
				<p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
					Fresh groceries and everyday essentials from your neighbourhood store, delivered to your door in about 10 minutes.
				</p>
			</div>

			<div>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shop</h3>
				<ul className="mt-3 space-y-2 text-sm">
					<li>
						<Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
							All products
						</Link>
					</li>
					{categories.slice(0, 4).map((c) => (
						<li key={c.slug}>
							<Link to={`/products?category=${c.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
								{c.name}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support</h3>
				<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
					<li><span className="cursor-pointer hover:text-foreground transition-colors">Delivery areas</span></li>
					<li><span className="cursor-pointer hover:text-foreground transition-colors">Returns & refunds</span></li>
					<li><span className="cursor-pointer hover:text-foreground transition-colors">Help centre</span></li>
					<li><span className="cursor-pointer hover:text-foreground transition-colors">Contact us</span></li>
				</ul>
			</div>

			<div>
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Operating hours</h3>
				<ul className="mt-3 space-y-2 text-sm text-muted-foreground">
					<li>Every day · 6 AM – 11 PM</li>
					<li>Delivery in ~10–30 minutes</li>
					<li className="pt-1">
						<a href="mailto:hello@instaneeds.app" className="text-foreground hover:underline font-medium">
							hello@instaneeds.app
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div className="border-t border-border py-6 text-xs text-muted-foreground">
			<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
				<span>© 2026 InstaNeeds · Essentials, delivered</span>
				<span>Terms · Privacy · Contact</span>
			</div>
		</div>
	</footer>
);

export default Footer;