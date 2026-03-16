export function AdminProductForm({ mode, formData, onChange, onSubmit, onCancel, submitting }) {
  const isEdit = mode === "edit";

  return (
    <form onSubmit={onSubmit} className="mt-5 rounded-lg border border-gray-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {isEdit ? "Modificar producto" : "Crear nuevo producto"}
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-product-name">
            Nombre
          </label>
          <input
            id="admin-product-name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-product-image-url">
            URL imagen
          </label>
          <input
            id="admin-product-image-url"
            name="image_url"
            value={formData.image_url}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-product-price">
            Precio
          </label>
          <input
            id="admin-product-price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-product-stock">
            Stock
          </label>
          <input
            id="admin-product-stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="admin-product-description">
          Descripción
        </label>
        <textarea
          id="admin-product-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
