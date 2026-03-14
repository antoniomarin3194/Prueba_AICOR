import { getAdminToken } from "../../utils/adminAuth";

const ADMIN_PRODUCTS_API = "http://localhost:8000/api/admin/products";

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

export async function createAdminProduct(payload) {
  const response = await fetch(ADMIN_PRODUCTS_API, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear el producto.");
  }

  return data.product;
}

export async function updateAdminProduct(productId, payload) {
  const response = await fetch(`${ADMIN_PRODUCTS_API}/${productId}`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo actualizar el producto.");
  }

  return data.product;
}

export async function deleteAdminProduct(productId) {
  const response = await fetch(`${ADMIN_PRODUCTS_API}/${productId}`, {
    method: "DELETE",
    headers: buildHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo eliminar el producto.");
  }

  return data;
}
