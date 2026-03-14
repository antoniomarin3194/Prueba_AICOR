import { useEffect, useState } from "react";
import { createAdminUser, loadAdminUsers } from "../../assets/UsersFunctions/adminUsersCrud";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      try {
        const responseUsers = await loadAdminUsers();
        if (isMounted) {
          setUsers(responseUsers);
        }
      } catch (loadError) {
        console.error("Error cargando usuarios:", loadError);
        if (isMounted) {
          setError(loadError.message || "No se pudieron cargar los usuarios.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setMessage("Completa nombre, email y contraseña.");
      return;
    }

    setSubmitting(true);
    try {
      const createdUser = await createAdminUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setUsers((prevUsers) => [createdUser, ...prevUsers]);
      setFormData({ name: "", email: "", password: "" });
      setShowCreateForm(false);
      setMessage(`Usuario admin ${createdUser.email} creado correctamente.`);
    } catch (createError) {
      console.error("Error creando usuario:", createError);
      setMessage(createError.message || "No se pudo crear el usuario.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold">Usuarios</h1>
      <p className="mt-2 text-gray-600">Consulta de usuarios registrados en la plataforma.</p>
      <p className="mt-1 text-sm text-blue-700">Este botón crea cuentas con acceso de administrador.</p>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          {showCreateForm ? "Cancelar" : "Crear usuario admin"}
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateSubmit} className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-800">Nuevo usuario admin</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creando..." : "Crear"}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

      {loading && <p className="mt-6 text-gray-500">Cargando usuarios...</p>}
      {!loading && error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
            <span className="col-span-1">ID</span>
            <span className="col-span-3">Nombre</span>
            <span className="col-span-5">Email</span>
            <span className="col-span-2">Acceso</span>
            <span className="col-span-1">Alta</span>
          </div>

          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-12 items-center border-b border-gray-100 px-4 py-3 text-sm text-gray-700 last:border-b-0">
              <span className="col-span-1">{user.id}</span>
              <span className="col-span-3">{user.name}</span>
              <span className="col-span-5">{user.email}</span>
              <span className="col-span-2">{user.is_admin ? "Admin" : "Cliente"}</span>
              <span className="col-span-1">{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
