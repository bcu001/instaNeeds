import { useEffect, useState } from "react"
import ProductCard from "@/components/product/ProductCard"
import LoadingUI from "@/components/common/LoadingUI"
import { useQuery } from "@tanstack/react-query"
import {useForm, useWatch} from 'react-hook-form'
import NoSearchResultUI from "@/components/common/NoSearchResultUI"
import { getProducts } from "@/services/product.service"

const ProductsPage = () => {	
	const {register, control, reset} = useForm({
		defaultValues: {
			q: "",
		},
	});
	const [page, setPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	
	const search = useWatch({
		control,
		name:"q"
	})
	
	useEffect(()=>{
		const timer = setTimeout(()=>{
			setSearchQuery(search);
			setPage(1);
		},500)
		return ()=> clearTimeout(timer);
	},[search])
	
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [page]);

	const {isPending, data} = useQuery({
		queryKey: ["getProducts", page, searchQuery],
		queryFn: getProducts
	})
		
		return (
			<div className="mx-auto max-w-7xl p-4">

			{/* search + sort bar */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
				<form className="join w-full sm:max-w-md" role="search">
					<input
						id="q"
						placeholder="Search in products…"
						className="input join-item w-full bg-base-200 placeholder:text-base-content/40"
						{...register("q",{ required: true })}
					/>
					<button disabled={true} type="submit" className="btn btn-primary join-item hidden">Search</button>
				</form>
			</div>

			{/* grid */}
			<div className="mt-6">
				{isPending && <div className="grid place-items-center py-24"><LoadingUI /></div>}
				{data?.products.length === 0 && <NoSearchResultUI reset={reset}/>}
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
					{data?.products.length > 0 && data?.products.map((p) => (
						<ProductCard key={p._id} product={p} />
					))}
				</div>
			</div>

			{/* pagination */}
			<div className='mt-10 flex items-center justify-center gap-4'>
					<button disabled={page===1}  onClick={()=> setPage(prev=> prev-1)} className='btn btn-outline btn-sm rounded-full disabled:opacity-40'>Prev</button>
					<span className="text-sm text-base-content/55">
						Page <span className="font-semibold text-base-content">{page}</span> of {data?.totalPages}
					</span>
					<button disabled={page >= data?.totalPages} onClick={()=> setPage(prev=> prev+1)} className='btn btn-outline btn-sm rounded-full disabled:opacity-40'>Next</button>
				
			</div>
		</div>
	)
}

export default ProductsPage