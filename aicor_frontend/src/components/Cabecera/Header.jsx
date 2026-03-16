import { EnlaceCabecera } from "./EnlaceCabecera";
import { CartIcon } from "../Shop/CartIcon";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { isAdminLoggedIn } from "../../utils/adminAuth";

export function Header({ carrito }) {
  const { usuario } = useAuth();
  const adminLoggedIn = isAdminLoggedIn();
  const itemsCount = carrito.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  return (
    <header className="fixed top-0 left-0 right-0 w-screen bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg z-50">
      <div className="relative px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="h-9 w-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-blue-700 font-bold text-base sm:text-lg">AJM</span>
            </div>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white truncate">ANTONIO J. MARIN AGUILAR</h1>
          </a>

          <div className="flex items-center gap-4 sm:gap-8">
            <CartIcon itemsCount={itemsCount} />
            <EnlaceCabecera texto="Inicio" url="/" />

            {!usuario && (
              <EnlaceCabecera texto="Entrar" url="http://localhost:8000/api/auth/google/redirect" />
            )}
            {usuario && (
              <>
                <div className="hidden sm:block">
                  <EnlaceCabecera texto="Mis Órdenes" url="/orders" />
                </div>
                <EnlaceCabecera texto="Logout" url="/logout" />
              </>
            )}
          </div>
        </div>

        {adminLoggedIn && (
          <div className="mt-2 sm:absolute sm:left-1/2 sm:top-1/2 sm:mt-0 sm:-translate-x-1/2 sm:-translate-y-1/2 flex justify-center">
            <Link
              to="/admin"
              className="rounded-lg bg-white px-3 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50"
            >
              Panel de Administración
            </Link>
          </div>
        )}

        {usuario && (
          <div className="sm:hidden mt-2 flex justify-center">
            <EnlaceCabecera texto="Mis Órdenes" url="/orders" />
          </div>
        )}
      </div>
    </header>
  );
}
