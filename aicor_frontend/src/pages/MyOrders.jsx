import React from 'react';
import {useOrders} from '../hooks/useOrders';
import { useAuth } from '../context/AuthContext';
import {Order} from '../components/Orders/Order';

export default function MyOrders() {
    const { orders, loading, error } = useOrders();
    const { token, loading: authLoading } = useAuth();

    if (authLoading) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Autenticando...</p>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Debes autenticarte</p>
                <p className="text-gray-500">Inicia sesión para ver tus órdenes</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-500">Cargando órdenes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">Error</p>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">No tienes órdenes aún</p>
                <p className="text-gray-500">Realiza tu primera compra para ver tus órdenes aquí</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8">Mis Órdenes</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map(order => (
                        <Order key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}