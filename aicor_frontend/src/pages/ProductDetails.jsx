import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadProducts } from "../assets/ProductsFunctions/loadProducts";
import { addProductCart } from "../assets/CartsFunctions/addProductCart";

export default function ProductDetails({ setCarrito }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        const products = await loadProducts();
        const productFound = products.find((item) => String(item.id) === String(id));

        if (isMounted) {
          setProduct(productFound ?? null);
        }
      } catch (error) {
        console.error("Error cargando producto:", error);
        if (isMounted) {
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product || Number(product.stock) <= 0) {
      return;
    }

    const quantityToAdd = Number(quantity);

    addProductCart(
      product.id,
      product.name,
      quantityToAdd,
      Number(product.price),
      product.image_url,
    );

    setCarrito((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + quantityToAdd }
            : item
        ));
      }

      return [...prev, { ...product, quantity: quantityToAdd }];
    });
  };

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Cargando producto...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Producto no encontrado</h1>
          <p className="mt-3 text-gray-600">No hemos encontrado la ficha del producto solicitado.</p>
          <Link
            to="/"
            className="inline-flex mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
        <div className="w-full min-h-72 bg-gray-50 rounded-md flex items-center justify-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="max-h-80 w-full object-contain p-4"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-900">{Number(product.price).toFixed(2)}€</p>
          <p className="text-gray-700 leading-relaxed">{product.description || "Sin descripción"}</p>
          <p className="text-gray-600">Stock disponible: <span className="font-medium text-gray-900">{product.stock}</span></p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="sm:w-44">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full border border-gray-300 rounded-md py-2 px-3 bg-white"
                disabled={Number(product.stock) <= 0}
              >
                {Array.from({ length: Number(product.stock) }, (_, index) => index + 1).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={Number(product.stock) <= 0}
              className="inline-flex justify-center bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Agregar al carrito
            </button>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
