import { Link } from "react-router"
import ProductCard from "@/components/product/ProductCard"
import CategoryCard from "@/components/category/CategoryCard"
import LoadingUI from "@/components/common/LoadingUI"
import { formatPrice } from "@/data/mockData"
import { useState } from "react"
import useCategory from "@/hooks/useCategory"
import useFeaturedProduct from "@/hooks/useFeaturedProduct"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import ApiErrorUI from "@/components/common/ApiErrorUI"
import { getApiErrorMessage } from "@/lib/apiError"

const HomePage = () => {
	useDocumentTitle("Home | InstaNeeds")
	const [page,setPage] = useState(1)
	const {data, isLoading, isError: featuredError, error: featuredErrorDetails, refetch: refetchFeatured} = useFeaturedProduct();
	const {data:categoriesData, isSuccess, isError: categoriesError, error: categoriesErrorDetails, refetch: refetchCategories} = useCategory(page);

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-base-100 to-accent/10">
				<div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
				<div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden />

				<div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
					<div>
						<span className="badge badge-primary badge-outline gap-1 rounded-full px-3">
							⚡ Delivery in ~30 minutes
						</span>
						<h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
							Daily needs, <span className="text-primary">delivered</span> before you finish your coffee
						</h1>
						<p className="mt-4 max-w-md text-base-content/70">
							Fresh groceries, chilled drinks and everyday essentials — available at 6 AM or 11 PM,
							brought to your door in about half an hour.
						</p>

						<div className="mt-7 flex flex-wrap gap-3">
							<Link to="/products" className="btn btn-primary rounded-full px-6">
								Shop now
							</Link>
							<Link to="/products?category=dairy" className="btn btn-ghost rounded-full border border-base-300 px-6">
								Explore groceries
							</Link>
						</div>

						<dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
							{[
								["2k+", "products"],
								["30 min", "delivery"],
								["500+", "daily orders"],
							].map(([value, label]) => (
								<div key={label} className="rounded-box border border-base-200 bg-base-100/70 px-3 py-2 text-center backdrop-blur">
									<dt className="text-lg font-bold text-primary">{value}</dt>
									<dd className="text-[11px] uppercase tracking-wide text-base-content/55">{label}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* hero artwork: floating product tiles */}
					<div className="relative mx-auto grid max-w-sm grid-cols-2 gap-4" aria-hidden>
						<img
							src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=60"
							alt=""
							loading="lazy"
							className="aspect-square w-full translate-y-4 rounded-3xl object-cover shadow-xl ring-1 ring-base-300"
						/>
						<img
							src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=60"
							alt=""
							loading="lazy"
							className="mt-10 aspect-square w-full rounded-3xl object-cover shadow-xl ring-1 ring-base-300"
						/>
						<span className="grid aspect-square w-full place-items-center rounded-3xl bg-primary text-6xl text-primary-content shadow-xl">
							🧃
						</span>
						<span className="grid aspect-square w-full translate-y-4 place-items-center rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 text-6xl shadow-xl ring-1 ring-base-300">
							🥦
						</span>
					</div>
				</div>
			</section>

			{/* ── Shop by category ─────────────────────────────────── */}
			<section className="mx-auto max-w-7xl px-4 pt-14">
				<div className="flex items-end justify-between">
					<div>
						<h2 className="text-xl font-bold sm:text-2xl">Shop by category</h2>
						<p className="mt-1 text-sm text-base-content/55">Freshest picks across the store</p>
					</div>
					<Link to="/products" className="btn btn-ghost btn-sm text-primary">View all →</Link>
				</div>
				<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
					{categoriesError && <ApiErrorUI message={getApiErrorMessage(categoriesErrorDetails, "Unable to load categories")} onRetry={refetchCategories} />}
					{isSuccess && categoriesData?.categories.map((c) => (
						<CategoryCard key={c.slug} category={c} />
					))}
				</div>
				<div className='mt-10 flex items-center justify-center gap-4'>
					<button disabled={page===1}  onClick={()=> setPage(prev=> prev-1)} className='btn btn-outline btn-sm rounded-full disabled:opacity-40'>Prev</button>
					<span className="text-sm text-base-content/55">
						Page <span className="font-semibold text-base-content">{page}</span> of {categoriesData?.totalPages}
					</span>
					<button disabled={page >= categoriesData?.totalPages} onClick={()=> setPage(prev=> prev+1)} className='btn btn-outline btn-sm rounded-full disabled:opacity-40'>Next</button>
				
			</div>
			</section>

			{/* ── Featured products ─────────────────────────────────── */}
			<section className="mx-auto max-w-7xl px-4 pb-20 pt-14">
				<div className="flex items-end justify-between">
					<div>
						<h2 className="text-xl font-bold sm:text-2xl">Trending right now</h2>
						<p className="mt-1 text-sm text-base-content/55">Most-loved items this week</p>
					</div>
					<Link to="/products?sort=price-asc" className="btn btn-ghost btn-sm text-primary">View all →</Link>
				</div>
				<div className="mt-5">
					{featuredError ? (
						<ApiErrorUI message={getApiErrorMessage(featuredErrorDetails, "Unable to load featured products")} onRetry={refetchFeatured} />
					) : isLoading ? (
						<div className="grid place-items-center py-16"><LoadingUI /></div>
					) : (
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
							{data?.products.map((p) => (
								<ProductCard key={p._id} product={p} />
							))}
						</div>
					)}
				</div>
			</section>

			{/* ── Value props ───────────────────────────────────────── */}
			<section className="border-y border-base-200 bg-base-200/50">
				<div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
					{[
						["⚡", "Superfast delivery", "Doorstep in ~30 minutes, rain or shine"],
						["🥬", "Freshness promise", "Produce picked and packed the same day"],
						["💸", "Lowest prices", "Daily offers, no hidden charges"],
					].map(([emoji, title, sub]) => (
						<div key={title} className="flex items-center gap-4">
							<span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-2xl">{emoji}</span>
							<div>
								<h3 className="text-sm font-bold">{title}</h3>
								<p className="text-xs text-base-content/60">{sub}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* ── App CTA ───────────────────────────────────────────── */}
			<section className="mx-auto max-w-7xl px-4 pt-14 pb-20">
				<div className="relative overflow-hidden rounded-box bg-linear-to-r from-primary to-primary/70 p-8 text-primary-content sm:p-12">
					<div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden />
					<h2 className="max-w-lg text-2xl font-extrabold sm:text-3xl">
						Hungry at 11 PM? Get instaNeeds on your phone
					</h2>
					<p className="mt-2 max-w-lg text-primary-content/85">
						Scan the QR, order in seconds, and get everything delivered while the kettle boils.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<button type="button" className="btn btn-neutral rounded-full bg-base-100 text-base-content hover:bg-base-200">
							🍎 App Store
						</button>
						<button type="button" className="btn rounded-full bg-base-100 text-base-content hover:bg-base-200">
							▶️ Google Play
						</button>
					</div>
					<p className="mt-4 text-xs text-primary-content/70">
						Prototype screens shown — {formatPrice(199)} free delivery threshold, {formatPrice(39)} under it.
					</p>
				</div>
			</section>
		</>
	)
}

export default HomePage