
import axios from 'axios';

export async function ProductosCarrito() {
    const token = localStorage.getItem('token');
    if (token) {

    console.log("Obteniendo número de productos en el carrito con token:", token);

    try {
        const response = await axios.get('http://localhost:8000/api/carrito/num-productos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Respuesta del servidor para el número de productos en el carrito:", response);
        console.log("Número de productos en el carrito:", response.data.num_productos);
        return response.data.num_productos || 0;

    } catch (error) {
        console.error(error);
        return 0;
    }
    } else {
        console.log("No hay token, obteniendo número de productos en el carrito desde localStorage");
        try {
            const localCart = localStorage.getItem('cart');
            const cartItems = localCart ? JSON.parse(localCart) : [];
            console.log("Número de productos en el carrito desde localStorage:", cartItems.length);
            return cartItems.length;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

}

