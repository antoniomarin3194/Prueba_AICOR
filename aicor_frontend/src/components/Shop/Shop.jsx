import { Article } from "./Article";
import { useEffect, useState } from "react";
import { addProductCart } from "../../assets/CartsFunctions/addProductCart";
import { loadProducts } from "../../assets/ProductsFunctions/loadProducts";

export function Shop({ carrito, setCarrito }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addCart = (product) => {
    console.log("Agregando producto al carrito:", product);

    addProductCart(product.id, product.name, 1, product.price, product.image_url);

    setCarrito((prev) => { // Actualiza el carrito con el estado anterior
      const existente = prev.find((antiguo) => antiguo.id === product.id); // Busca si el producto ya existe en el carrito
      if (existente) { // Si el producto ya estaba en el carrito
        return prev.map((antiguo) => // Recorre todos los productos del carrito
          antiguo.id === product.id ? { ...antiguo, quantity: (antiguo.quantity ?? 1) + 1 } : antiguo // Si coincide el ID, suma 1 a la cantidad; si no, lo deja igual
        );
      }
      return [...prev, { ...product, quantity: 1 }]; // Si no existe, agrega el producto nuevo con cantidad 1
    });
  };

  // Cargar productos desde API
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const responseProducts = await loadProducts();
        if (isMounted) {
          setProducts(responseProducts);
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
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

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8 flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">Cargando productos...</p>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 pt-40 sm:pt-28 pb-8">
      <div className="grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
        {products.map((product) => (
          <Article
            key={product.id}
            id={product.id}
            name={product.name}
            price={Number(product.price.toFixed(2))}
            description={product.description}
            stock={product.stock}
            image_url={product.image_url}
            addCart={addCart}
          />
          
        ))}
        <Article
            key='00000000'
            id='00000000'
            name='Producto de prueba'
            price='99.99'
            description='Descripción de prueba'
            stock={10}
            image_url='url_de_prueba'
            addCart={addCart}
          />
      </div>
    </section>
  );
}
