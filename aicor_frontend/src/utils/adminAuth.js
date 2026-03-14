const ADMIN_TOKEN_KEY = "admin_token";
const ADMIN_USER_KEY = "admin_user";
const ADMIN_API_BASE = "http://localhost:8000/api/admin";

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminUser() {
  const userString = localStorage.getItem(ADMIN_USER_KEY);

  if (!userString) {
    return null;
  }

  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
}

export function isAdminLoggedIn() {
  return Boolean(getAdminToken());
}

export function setAdminSession(token, user) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);

  if (user) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(ADMIN_USER_KEY);
  }
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export async function logoutAdmin() {
  const token = getAdminToken();

  if (token) {
    try {
      await fetch(`${ADMIN_API_BASE}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Error cerrando sesión admin:", error);
    }
  }

  clearAdminSession();
}
