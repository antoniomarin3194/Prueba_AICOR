import { useAuth } from "../context/AuthContext";

export function useCheckout() {
  const { token } = useAuth();

  const checkout = async (carrito) => {
    // Validar que hay token y carrito
    if (!token) {
      return {
        success: false,
        error: "No estás autenticado. Por favor inicia sesión.",
      };
    }

    if (!carrito || carrito.length === 0) {
      return {
        success: false,
        error: "El carrito está vacío.",
      };
    }

    try {
      const response = await fetch("http://localhost:8000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: carrito }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Error al crear el pedido",
        };
      }

      return {
        success: true,
        order: data.order,
        order_id: data.order_id,
      };
    } catch (error) {
      console.error("Error en checkout:", error);
      return {
        success: false,
        error: "Error de conexión al servidor",
      };
    }
  };

  return { checkout };
}
