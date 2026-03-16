import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import BuyItem from '../components/BuyList/BuyItem';
import BuyAside from '../components/BuyList/BuyAside';

export default function CheckOut({ carrito = [], setCarrito, cartLoading = false }) {
    const navigate = useNavigate();
    const [checkoutLoading, setCheckoutLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { checkout } = useCheckout();

    const handleCheckout = async () => {
        if (!carrito || carrito.length === 0) {
            setError('El carrito está vacío. Por favor agrega productos antes de continuar.');
            return;
        }

        setCheckoutLoading(true);
        setError(null);

        const result = await checkout(carrito);

        if (result.success) {
            localStorage.removeItem('cart');
            setCarrito([]);
            navigate(`/order-details/${result.order_id}`, { state: { isNewOrder: true } });
        } else {
            setError(result.error);
            setCheckoutLoading(false);
        }
    };

    if (cartLoading) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Cargando productos...</p>
            </div>
        );
    }

    if (carrito.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Tu carrito está vacío</p>
                <p className="text-gray-500">Agrega productos para comenzar tu compra</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8">Confirmar Pedido</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="grid gap-4">
                            {carrito.map((item) => (
                                <BuyItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <BuyAside 
                            carrito={carrito}
                            onCheckout={handleCheckout}
                            loading={checkoutLoading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}