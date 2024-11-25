import { API_URL } from "@/lib/api";
import ProductDetails from "./ProductDetails";



export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const response = await fetch(`${API_URL}`);
    const products: { slug: string }[] = await response.json();

    if (!Array.isArray(products)) {
      console.error("API did not return an array of products.");
      return [];
    }

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export type PageProps = {
  params: Promise<{ slug: string }>;
};

const ProductDetailPage = async ({ params }: PageProps) => {
  // Await the params to resolve the promise
  const resolvedParams = await params;

  const { slug } = resolvedParams;

  try {
    const productResponse = await fetch(`${API_URL}/${slug}`);
    if (!productResponse.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await productResponse.json();

    if (!product) {
      return <div>Product not found.</div>;
    }

    return (
      <div>
        <ProductDetails product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product details:", error);
    return <div>Failed to load product details.</div>;
  }
};

export default ProductDetailPage;
