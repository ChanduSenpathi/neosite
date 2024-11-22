
import { API_URL } from "@/lib/api";
import ProductDetails from "./ProductDetails";
import Loader from "@/components/loader/Loader";



export async function generateStaticParams() {
  const response = await fetch(`${API_URL}`);
  const products = await response.json();

  if (!Array.isArray(products)) {
    console.error('API did not return an array of products.');
    return [];
  }

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}



const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const product = await fetch(`${API_URL}/${slug}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  })
  .catch((error) => {
    console.error("Error fetching product:", error);
    return null;
  });


  if (!product || !product.id) {
    return <Loader />;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetailPage;

