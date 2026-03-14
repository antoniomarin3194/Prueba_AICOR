export default async function Buy({ carrito }) {
    const token = localStorage.getItem('token');
    if (token) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart && cart.length > 0) {
            fetch('http://localhost:8000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart: { items: cart } })
            })
            .then(async response => {
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    const message = data?.error || 'Error al crear la orden';
                    throw new Error(message);
                }
                return data;
            })
            .then(data => {
                localStorage.removeItem('cart'); // Limpiamos el carrito local después de la compra
                navigate("/checkout");
            })
            .catch(error => {
                console.error("Error al crear la orden:", error);
            });
        } else {
            console.log("No hay productos en el carrito para realizar la compra.");
        }
    } else {
        console.log("Usuario no autenticado. No se puede realizar la compra.");
    }
}