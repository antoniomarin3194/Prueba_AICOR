import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { isAdminLoggedIn, setAdminSession } from "../../utils/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  if (isAdminLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Debes introducir email y contraseña.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        setError(data.message || "No se pudo iniciar sesión de administrador.");
        return;
      }

      setAdminSession(data.token, data.user);
      navigate(from, { replace: true });
    } catch (requestError) {
      console.error("Error login admin:", requestError);
      setError("Error de conexión con el servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 pb-8 pt-24 sm:pt-32">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-xl font-semibold sm:text-2xl">Login de administración</h1>
        <p className="mt-2 text-sm text-gray-600">Accede para gestionar el panel administrativo.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
              placeholder="admin@aicor.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-password">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
              placeholder="********"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            {submitting ? "Entrando..." : "Entrar al panel"}
          </button>
        </form>
      </div>
    </section>
  );
}
