import { Link } from "react-router-dom";
import { isAdminLoggedIn } from "../../utils/adminAuth";

export function Footer({  }) {
  const adminLoggedIn = isAdminLoggedIn();

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center sm:grid sm:grid-cols-3 sm:items-center">
        <div className="sm:col-start-2">
          <p className="text-sm">&copy; 2024 Antonio J. Marin Aguilar. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Desarrollado por Antonio J. Marin Aguilar</p>
        </div>

        {!adminLoggedIn && (
          <div className="mt-4 sm:mt-0 sm:col-start-3 sm:justify-self-end">
            <Link
              to="/admin/login"
              className="inline-block rounded-lg bg-white px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Entrar al Panel Admin
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}