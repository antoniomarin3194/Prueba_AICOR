export async function loadProducts() {
  const response = await fetch("http://localhost:8000/api/products", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }

  return response.json();
}
