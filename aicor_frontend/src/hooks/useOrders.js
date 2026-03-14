import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useOrders() {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            if (!token) {
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const response = await fetch('http://localhost:8000/api/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    const errorMsg = data.error || `Error ${response.status}: ${response.statusText}`;
                    throw new Error(errorMsg);
                }

                setOrders(data.orders || []);
                setError(null);
            } catch (err) {
                console.error('Error cargando órdenes:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [token]);

    return { orders, loading, error };
}