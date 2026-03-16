import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../hooks/useOrder';

const STATUS_LABELS = {
    pending: 'Pendiente',
    shipped: 'Enviada',
    completed: 'Completada',
    cancelled: 'Cancelada',
};

export default function OrderDetails({ setCarrito }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { order, loading, error } = useOrder(id);
    const [afterCheckout, setAfterCheckout] = React.useState(location.state?.isNewOrder || false);

    // Asegurarse de que el carrito esté vacío al montar este componente
    React.useEffect(() => {
        if (setCarrito && afterCheckout) {
            setCarrito([]);
        }
    }, [setCarrito, afterCheckout]);

    if (loading) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Cargando detalles de la orden...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">Error</p>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Volver al inicio
                </button>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Orden no encontrada</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                
                {afterCheckout && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex items-center">
                            <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        <div>
                            <h1 className="text-2xl font-bold text-green-800 mb-1">¡Pedido realizado con éxito!</h1>
                            <p className="text-green-700">Tu orden ha sido procesada correctamente</p>
                        </div>
                    </div>
                </div>
                )}

                
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h2 className="text-2xl font-bold text-white">Orden #{order.id}</h2>
                            <span className="rounded-md bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                                Estado: {STATUS_LABELS[order.status] || order.status || 'Pendiente'}
                            </span>
                        </div>
                        <p className="text-blue-100">Fecha: {new Date(order.created_at).toLocaleString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Productos</h3>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-600">Cantidad: {item.quantity} × {item.price.toFixed(2)}€</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{item.subtotal.toFixed(2)}€</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-6 pt-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900">Total:</h3>
                                <p className="text-3xl font-bold text-blue-600">{order.total_price.toFixed(2)}€</p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md cursor-pointer"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

   