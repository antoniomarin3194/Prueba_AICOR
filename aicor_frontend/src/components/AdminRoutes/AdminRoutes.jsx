import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "../../pages/admin/AdminDashboard";
import AdminProducts from "../../pages/admin/AdminProducts";
import AdminUsers from "../../pages/admin/AdminUsers";
import AdminOrders from "../../pages/admin/AdminOrders";
import { isAdminLoggedIn } from "../../utils/adminAuth";
import { AdminLayout } from "./AdminLayout";

export default function AdminRoutes() {
  const location = useLocation();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
