export function addProductCart(id, name, quantity, price, image_url) {
        const token = localStorage.getItem('token');
        // Si el usuario no está autencicado, se maneja el carrito en localStorage
        if (!token) {
            
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (!cart) {
                cart = [];
            }
            
            // Busca si el producto ya existe
            const productoExistente = cart.find(item => item.product_id === id);
            
            if (productoExistente) {
                // Si existe, suma la cantidad
                productoExistente.quantity += quantity;
                console.log("Cantidad actualizada en carrito local:", { 
                    id,
                    product_id: id,
                    name,
                    quantity: productoExistente.quantity,
                    price,
                    image: image_url
                });
            } else {
                // Si no existe, lo agrega nuevo
                cart.push({ 
                    id,
                    product_id: id,
                    name,
                    quantity,
                    price,
                    image: image_url
                });
                console.log("Producto agregado al carrito local:", { 
                    id,
                    product_id: id,
                    name,
                    quantity,
                    price,
                    image: image_url
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
        // si el usuario está autenticado, se envía la información al servidor para actualizar el carrito del usuario
        } else {
            fetch('http://localhost:8000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Producto agregado al carrito del servidor:", data);
            })
            .catch(error => {
                console.error("Error al agregar producto al carrito del servidor:", error);
            });
        }


}