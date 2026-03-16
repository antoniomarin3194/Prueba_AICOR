import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mergeCarts } from "../assets/CartsFunctions/MergeCarts";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      console.log("Usuario logueado:");

      mergeCarts();
      navigate("/");
    } else {
      navigate("/");
    }
  }, []);

  return <p>Iniciando sesión...</p>;
}
