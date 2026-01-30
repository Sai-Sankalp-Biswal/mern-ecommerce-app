import API_URL from "../config";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}
