import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor que envuelve toda la app
export function AuthProvider({ children }) {
  // Estado del usuario y token
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, revisar si hay token guardado
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    if (tokenGuardado) {
      // Si existe token, decodificarlo y guardar usuario
      try {
        const usuarioDecodificado = jwtDecode(tokenGuardado);
        setToken(tokenGuardado);
        setUsuario(usuarioDecodificado);
      } catch (error) {
        // Si el token es inválido, limpiarlo
        localStorage.removeItem("token");
        console.error("Token inválido:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (nuevoToken) => {
    localStorage.setItem("token", nuevoToken);
    const usuarioDecodificado = jwtDecode(nuevoToken);
    setToken(nuevoToken);
    setUsuario(usuarioDecodificado);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
