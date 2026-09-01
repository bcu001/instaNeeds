import useCartContext from '@/hooks/useCartContext'
import ProductImage from '@/components/product/ProductImage';
import { Link } from 'react-router';
import { formatPrice } from '@/data/mockData';
import QuantityStepper from '../product/QuantityStepper';
import useProductById from '@/hooks/useProductById';


const CartCard = ({item}) => {
    const {closeDrawer} = useCartContext();
    const {data:productData} = useProductById(item.productId);
  return (
    <li key={productData?.product._id} className="flex items-center gap-3 py-4">
        <Link to={`/products/${productData?.product._id}`} onClick={closeDrawer} className="shrink-0">
            <ProductImage src={productData?.product.imageURL} alt={productData?.product.title} className="h-16 w-16 rounded-lg" />
        </Link>
        <div className="min-w-0 flex-1">
            <Link
                to={`/products/${productData?.product._id}`}
                onClick={closeDrawer}
                className="block truncate text-sm font-semibold hover:text-primary"
            >
                {productData?.product.title}
            </Link>
            <p className="text-xs text-base-content/55">
                {formatPrice(productData?.product.price)} · {productData?.product.unit}
            </p>
        </div>
        <div className="flex flex-col items-end gap-1">
            <QuantityStepper productId={productData?.product._id} />
        </div>
    </li>
  )
}

export default CartCard
