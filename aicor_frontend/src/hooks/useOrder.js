import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useOrder(orderId) {
    const { token } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrder() {
            // Si no hay token o ID, esperar
            if (!token || !orderId) {
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const response = await fetch(`http://localhost:8000/api/order/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al cargar la orden');
                }

                setOrder(data.order);
                setError(null);
            } catch (err) {
                console.error('Error cargando orden:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId, token]);

    return { order, loading, error };
}
