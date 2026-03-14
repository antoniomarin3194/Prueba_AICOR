import { Outlet } from "react-router-dom";
import { AdminPanelNav } from "./AdminPanelNav";

export function AdminLayout() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-44 sm:pt-36">
      <AdminPanelNav />
      <div className="mt-6">
        <Outlet />
      </div>
    </section>
  );
}
