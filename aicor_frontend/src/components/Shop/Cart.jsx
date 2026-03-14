import { CartItem } from '../Cart/CartItem';
import { CartAside } from '../Cart/CartAside';
import { removeProductCart } from '../../assets/CartsFunctions/RemoveProduct';

export function Cart({ carrito, setCarrito, cartLoading }) {
    const cartItems = carrito;
    const loading = cartLoading;

    if (loading) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Cargando carrito...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</p>
                <p className="text-gray-500">Agrega productos para comenzar tu compra</p>
            </div>
        );
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product?.price ?? item.price ?? 0;
        return sum + (price * (item.quantity ?? 1));
    }, 0);

    const handleRemove = ({ id, productId }) => {
        removeProductCart(productId);
        setCarrito(prevItems => {
            // Buscamos el item a eliminar
            const item = prevItems.find(i => i.id === id);
            if (item) {
                // Si tiene más de 1 unidad, solo resta 1
                if (item.quantity > 1) {
                    return prevItems.map(i =>
                        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                    );
                }
                // Si solo tiene 1 unidad, lo elimina del carrito
                return prevItems.filter(i => i.id !== id);
            }
            return prevItems;
        });
    };


    return (
        <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Carrito de compra</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => {
                            const itemPrice = item.product?.price ?? item.price ?? 0;
                            const itemName =
                                item.product?.name ??
                                item.product?.nombre ??
                                item.name ??
                                item.nombre ??
                                'Producto';
                            const itemImage = item.product?.image_url ?? item.image ?? '';
                            
                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    productId={item.product_id ?? item.id}
                                    name={itemName}
                                    price={itemPrice}
                                    quantity={item.quantity}
                                    image={itemImage}
                                    onRemove={handleRemove}
                                />
                            );
                        })}
                    </div>
                    
                    
                    <div className="lg:col-span-1">
                        <CartAside numProducts={cartItems.length} subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
