import useCartContext from '@/hooks/useCartContext'

const CartCardSkeleton = () => {
    const {closeDrawer} = useCartContext();
  return (
    <li className="flex items-center gap-3 py-4 animate-pulse">
        <div  onClick={closeDrawer} className="shrink-0 rounded-md size-16 bg-neutral-300">
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
            <div onClick={closeDrawer} className="block h-4 rounded-full bg-neutral-300" ></div>
            <p className="text-xs text-base-content/55 h-4 bg-neutral-300 w-20"></p>
        </div>
    </li>
  )
}

export default CartCardSkeleton
