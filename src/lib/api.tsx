export const API_URL = 'https://dummyjson.com/products'
export default async function getAllProducts() {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    return data.products;
}

// export async function getArrayOfProducts() {
//     const res = await fetch(`${API_URL}`);
//     const data = await res.json();
//     console.log('API Response:', data);  // Log the response to check the structure
    
//     // Access the 'products' property and then map over it
//     const products = data.products || [];  // Fallback to an empty array if 'products' doesn't exist
//     console.log('Products:', products)
//     return products.map((product: { slug: string }) => product.slug);
//   }


  export async function getArrayOfProducts() {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    
    // Assuming data is an array of products
    return data; // Should be [{ slug: 'product-1' }, { slug: 'product-2' }]
  }
  
  
  

// export async function getSingleProduct(id: number){
//     const response = await fetch(`${API_URL}/${id}`);
//     const data = await response.json();
//     return data;
// }