import { useEffect, useState } from "react";
import { loadAdminOrders, updateAdminOrderStatus } from "../../assets/OrdersFunctions/adminOrdersCrud";

const STATUS_LABELS = {
  pending: "Pendiente",
  shipped: "Enviada",
  completed: "Completada",
  cancelled: "Cancelada",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchOrders() {
      try {
        const responseOrders = await loadAdminOrders();
        if (isMounted) {
          setOrders(responseOrders);
        }
      } catch (loadError) {
        console.error("Error cargando órdenes:", loadError);
        if (isMounted) {
          setError(loadError.message || "No se pudieron cargar las órdenes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (order, newStatus) => {
    try {
      const updatedOrder = await updateAdminOrderStatus(order.id, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((currentOrder) =>
          currentOrder.id === updatedOrder.id ? updatedOrder : currentOrder,
        ),
      );
      setMessage(`Orden ${updatedOrder.id} actualizada a ${updatedOrder.status}.`);
    } catch (updateError) {
      console.error("Error actualizando estado de orden:", updateError);
      setMessage(updateError.message || "No se pudo actualizar la orden.");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold">Órdenes</h1>
      <p className="mt-2 text-gray-600">Gestiona el estado de las órdenes de los clientes.</p>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      {loading && <p className="mt-6 text-gray-500">Cargando órdenes...</p>}
      {!loading && error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 grid gap-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Orden #{order.id}</h2>
                  <p className="text-sm text-gray-600">
                    Cliente: {order.user?.name || "N/A"} ({order.user?.email || "sin email"})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-700">Total: {Number(order.total_price).toFixed(2)} €</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(order, "shipped")}
                    className="rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
                  >
                    Simular envío de producto
                  </button>
                )}

                {order.status === "shipped" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(order, "pending")}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Volver a pendiente
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(order, "completed")}
                      className="rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-white hover:bg-green-800"
                    >
                      Producto entregado
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3 rounded-md border border-gray-100">
                {(order.items || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-gray-100 px-3 py-2 text-sm last:border-b-0">
                    <span>{item.product?.name || "Producto"}</span>
                    <span>Cant: {item.quantity} · {Number(item.price).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
