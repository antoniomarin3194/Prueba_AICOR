export function AdminProductItem({
  product,
  onEdit,
  onDelete,
  isEditOpen,
  editForm,
  isDeleteOpen,
  onConfirmDelete,
  onCancelDelete,
}) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">ID: {product.id}</p>
        </div>
        <span className="rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
          {Number(product.price).toFixed(2)} €
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-600">{product.description || "Sin descripción"}</p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Stock: <span className="font-medium text-gray-800">{product.stock}</span></p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Modificar
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Eliminar
          </button>
        </div>
      </div>

      {isEditOpen && <div className="mt-4">{editForm}</div>}

      {isDeleteOpen && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">
            ¿Seguro que quieres eliminar el producto <strong>{product.name}</strong> (ID {product.id})?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={onConfirmDelete}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Confirmar eliminación
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
