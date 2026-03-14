import { getAdminToken } from "../../utils/adminAuth";

const ADMIN_USERS_API = "http://localhost:8000/api/admin/users";

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

export async function loadAdminUsers() {
  const response = await fetch(ADMIN_USERS_API, {
    headers: buildHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudieron cargar los usuarios.");
  }

  return data.users ?? [];
}

export async function createAdminUser(payload) {
  const response = await fetch(ADMIN_USERS_API, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo crear el usuario.");
  }

  return data.user;
}
