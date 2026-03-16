import { getAdminToken } from "../../utils/adminAuth";

const ADMIN_ORDERS_API = "http://localhost:8000/api/admin/orders";

function buildHeaders() {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No hay sesión admin activa.");
  }

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function loadAdminOrders() {
  const response = await fetch(ADMIN_ORDERS_API, {
    headers: buildHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron cargar las órdenes.");
  }

  return data.orders ?? [];
}

export async function updateAdminOrderStatus(orderId, status) {
  const response = await fetch(`${ADMIN_ORDERS_API}/${orderId}/status`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo actualizar el estado de la orden.");
  }

  return data.order;
}
