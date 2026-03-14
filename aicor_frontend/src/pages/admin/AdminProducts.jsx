import { useEffect, useState } from "react";
import { loadProducts } from "../../assets/ProductsFunctions/loadProducts";
import { AdminProductItem } from "../../components/AdminProducts/AdminProductItem";
import { AdminProductForm } from "../../components/AdminProducts/AdminProductForm";
import {
  createAdminProduct,
  deleteAdminProduct,
  updateAdminProduct,
} from "../../assets/ProductsFunctions/adminProductsCrud";

export default function AdminProducts() {
  const defaultFormData = {
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const responseProducts = await loadProducts();
        if (isMounted) {
          setProducts(responseProducts);
        }
      } catch (loadError) {
        console.error("Error cargando productos en admin:", loadError);
        if (isMounted) {
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const openCreateForm = () => {
    setFormMode("create");
    setFormData(defaultFormData);
    setDeleteTarget(null);
    setActionMessage("");
  };

  const openEditForm = (product) => {
    if(formMode === "edit" && formData.id === product.id) {
      // Si el formulario de edición ya está abierto para este producto, lo cerramos
      setFormMode(null);
      setFormData(defaultFormData);
      return;
    }
    setFormMode("edit");
    setFormData({
      id: product.id,
      name: product.name ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
      image_url: product.image_url ?? "",
    });
    setDeleteTarget(null);
    setActionMessage("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeForm = () => {
    setFormMode(null);
    setFormData(defaultFormData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      image_url: formData.image_url.trim(),
    };

    if (!payload.name || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
      setActionMessage("Completa nombre, precio y stock con valores válidos.");
      return;
    }

    setSubmitting(true);
    try {
      if (formMode === "create") {
        const createdProduct = await createAdminProduct(payload);
        setProducts((prevProducts) => [createdProduct, ...prevProducts]);
        setActionMessage(`Producto ${createdProduct.name} creado correctamente.`);
      }

      if (formMode === "edit" && formData.id) {
        const updatedProduct = await updateAdminProduct(formData.id, payload);
        setProducts((prevProducts) =>
          prevProducts.map((currentProduct) =>
            currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct,
          ),
        );
        setActionMessage(`Producto ${updatedProduct.name} actualizado correctamente.`);
      }

      closeForm();
    } catch (saveError) {
      console.error("Error guardando producto:", saveError);
      setActionMessage(saveError.message || "No se pudo guardar el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  const requestDeleteProduct = (product) => {
    setDeleteTarget(product);
    setFormMode(null);
    setActionMessage("");
  };

  const cancelDeleteProduct = () => {
    setDeleteTarget(null);
  };

  const confirmDeleteProduct = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteAdminProduct(deleteTarget.id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deleteTarget.id));
      setActionMessage(`Producto ${deleteTarget.id} eliminado correctamente.`);
      setDeleteTarget(null);
    } catch (deleteError) {
      console.error("Error eliminando producto:", deleteError);
      setActionMessage(deleteError.message || "No se pudo eliminar el producto.");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold">Productos</h1>
      <p className="mt-2 text-gray-600">Aquí podrás crear, editar y eliminar productos.</p>

      <div className="mt-4">
        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Crear nuevo producto
        </button>
      </div>

      {formMode === "create" && (
        <AdminProductForm
          mode={formMode}
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
      )}

      {actionMessage && <p className="mt-4 text-sm text-gray-700">{actionMessage}</p>}

      {loading && <p className="mt-6 text-gray-500">Cargando productos...</p>}

      {!loading && error && <p className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 grid gap-4">
          {products.map((product) => (
            <AdminProductItem
              key={product.id}
              product={product}
              onEdit={openEditForm}
              onDelete={requestDeleteProduct}
              isEditOpen={formMode === "edit" && formData.id === product.id}
              editForm={(
                <AdminProductForm
                  mode="edit"
                  formData={formData}
                  onChange={handleFormChange}
                  onSubmit={handleFormSubmit}
                  onCancel={closeForm}
                  submitting={submitting}
                />
              )}
              isDeleteOpen={deleteTarget?.id === product.id}
              onConfirmDelete={confirmDeleteProduct}
              onCancelDelete={cancelDeleteProduct}
            />
          ))}
        </div>
      )}

        


    </section>
  );
}
