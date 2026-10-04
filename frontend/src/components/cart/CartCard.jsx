import useCartContext from '@/hooks/useCartContext';
import ProductImage from '@/components/product/ProductImage';
import { Link } from 'react-router';
import { formatPrice } from '@/data/mockData';
import QuantityStepper from '../product/QuantityStepper';
import useProductById from '@/hooks/useProductById';
import resizeImage from '@/lib/resizeImage';
import CartCardSkeleton from '../SkeletonLoaders/CartCardSkeleton';

const CartCard = ({ item }) => {
    const { closeDrawer } = useCartContext();
    const { data: productData, isPending } = useProductById(item.productId);

    if (isPending) return <CartCardSkeleton />;

    return (
        <li className="flex items-center gap-3 py-3 border-b border-border">
            <Link
                to={`/products/${productData?.product._id}`}
                onClick={closeDrawer}
                className="shrink-0"
            >
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/60">
                    <ProductImage
                        src={resizeImage(productData?.product.imageURL, 120, 65)}
                        alt={productData?.product.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </Link>

            <div className="min-w-0 flex-1">
                <Link
                    to={`/products/${productData?.product._id}`}
                    onClick={closeDrawer}
                    className="block truncate text-sm font-semibold text-foreground hover:text-muted-fg transition-colors"
                >
                    {productData?.product.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {productData?.product.unit ? `${productData.product.unit} · ` : ""}
                    <span className="font-medium text-foreground">
                        {formatPrice(productData?.product.price)}
                    </span>
                </p>
            </div>

            <div className="shrink-0 w-24">
                <QuantityStepper productId={productData?.product._id} />
            </div>
        </li>
    );
};

export default CartCard;
