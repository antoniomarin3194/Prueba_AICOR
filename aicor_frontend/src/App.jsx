import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";
import Logout from "./pages/Logout";
import Cart from "./pages/CartPage";
import { Header } from "./components/Cabecera/Header";
import { LoadCart } from "./assets/CartsFunctions/LoadCart";
import { AuthProvider } from "./context/AuthContext";
import CheckOut from "./pages/CheckOut";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";
import { Footer } from "./components/Footer/Footer";
import AdminRoutes from "./components/AdminRoutes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCart() {
      try {
        const items = await LoadCart();
        if (isMounted) {
          setCarrito(items);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
      } finally {
        if (isMounted) {
          setCartLoading(false);
        }
      }
    }

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header carrito={carrito} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/cart"
              element={(
                <Cart
                  carrito={carrito}
                  setCarrito={setCarrito}
                  cartLoading={cartLoading}
                />
              )}
            />
            <Route path="/checkout" element={<CheckOut carrito={carrito} setCarrito={setCarrito} cartLoading={cartLoading} />} />
            <Route path="/product/:id" element={<ProductDetails setCarrito={setCarrito} />} />
            <Route path="/order-details/:id" element={<OrderDetails setCarrito={setCarrito} />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
