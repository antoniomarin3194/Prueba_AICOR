

import { Shop } from "../components/Shop/Shop";


export default function Home({ carrito, setCarrito }) {
  return (
    <>
      <Shop carrito={carrito} setCarrito={setCarrito} />
    </>
  );
}
