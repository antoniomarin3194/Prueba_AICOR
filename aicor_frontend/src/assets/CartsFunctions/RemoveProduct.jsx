// remove product from cart
export function removeProductCart(productId) {
    const token = localStorage.getItem('token');
    if (!token) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            cart.map((item, index) => {
                if (item.product_id === productId) {
                    if(item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            console.log("No hay carrito local para eliminar el producto:", productId);
        }
        
    } else {
        fetch('http://localhost:8000/api/cart/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product_id: productId })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Producto eliminado del carrito del servidor:", data);
        })
        .catch(error => {
            console.error("Error al eliminar producto del carrito del servidor:", error);
        });
    }
}