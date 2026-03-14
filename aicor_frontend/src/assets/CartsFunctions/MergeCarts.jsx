// merge cards when user log in
export function mergeCarts() {
    const token = localStorage.getItem('token');
    if (token) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart && cart.length > 0) {
            fetch('http://localhost:8000/api/cart/merge', {
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
                    const message = data?.error || 'Error al fusionar el carrito';
                    throw new Error(message);
                }
                return data;
            })
            .then(data => {
                console.log("Carrito fusionado con el servidor:", data);
                localStorage.removeItem('cart'); 
            })
            .catch(error => {
                console.error("Error al fusionar el carrito con el servidor:", error);
            });
        }
    }
}