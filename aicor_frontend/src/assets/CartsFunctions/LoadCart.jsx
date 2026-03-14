export async function LoadCart() {
	const token = localStorage.getItem('token');

	if (token) {
		try {
			const response = await fetch('http://localhost:8000/api/cart', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = await response.json();
			return data.cart?.items ?? [];
		} catch (error) {
			console.error(error);
			return [];
		}
	}else{
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error(error);
            return [];
	}
}

	
}