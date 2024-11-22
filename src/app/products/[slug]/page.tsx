
import { API_URL } from "@/lib/api";
import ProductDetails from "./ProductDetails";



export async function  generateStaticParams  (){
  const response = await fetch(`${API_URL}`);
  const products = await response.json();

  if (!Array.isArray(products)) {
      console.error('API did not return an array of products.');
      return [];
  }

  return products.map((product: { slug: string }) => ({
      slug: product.slug,
  }));
};


const ProductDetailPage = async ({params} :{params: {slug: string}}) =>{

  const product = await fetch(`${API_URL}/${params.slug}`).then((res) => res.json());
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  )
}

export default ProductDetailPage
