import { Link, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth";

export function AdminPanelNav() {
  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    await logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Panel
          </Link>
          <Link
            to="/admin/products"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Productos
          </Link>
          <Link
            to="/admin/users"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Usuarios
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          >
            Órdenes
          </Link>
        </div>

        <button
          type="button"
          onClick={handleAdminLogout}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cerrar sesión admin
        </button>
      </div>
    </div>
  );
}
