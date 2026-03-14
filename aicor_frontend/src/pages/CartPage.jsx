

import { Cart } from "../components/Shop/Cart";


export default function CartPage({ carrito, setCarrito, cartLoading }) {
  return (
    <>
      <Cart carrito={carrito} setCarrito={setCarrito} cartLoading={cartLoading} />
    </>
  );
}
