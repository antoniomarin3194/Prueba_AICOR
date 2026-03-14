export function EstaAutenticado() {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe, false si no
}