import { formatPrice } from "@/data/mockData"
import { Link } from "react-router"

const OrderSuccess = ({orderId, total, payment, slot}) => {
  return (
    <div className="mx-auto grid max-w-lg place-items-center px-4 py-20 text-center">
				<div className="w-full rounded-box border border-base-200 bg-base-100 p-10">
					<div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/10 text-success">
						<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
					<h1 className="mt-5 text-2xl font-bold">Order confirmed!</h1>
					<p className="mt-2 text-sm text-base-content/60">
						Order <span className="font-semibold text-base-content">#{orderId}</span> ·{" "}
						<span className="font-semibold text-base-content">{formatPrice(total)}</span> · Payment{" "}
						{payment === "cod" ? "on delivery" : "received"} ✓
					</p>
					<p className="mt-1 text-sm text-base-content/60">
						{slot === "now" ? "Your rider is being assigned now — arriving in ~30 minutes." : "Your delivery is scheduled."}
					</p>
					<div className="divider my-5" />
					<p className="text-sm text-base-content/70">⚡ Track your rider live once the hub packs your order.</p>
					<div className="mt-6 flex justify-center gap-3">
						<Link to="/products" className="btn btn-primary rounded-full px-6">Shop more</Link>
						<Link to="/" className="btn btn-ghost rounded-full">Home</Link>
					</div>
				</div>
			</div>
  )
}

export default OrderSuccess
