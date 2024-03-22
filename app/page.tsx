import { FetchProduct } from "@/actions/FetchProducts";
import Main from "@/components/Homepage/Main";
import Product from "@/components/Product/Product";

export default async function HomePage() {
  const database = await FetchProduct();
  const products = database?.map<any>((product: any) => {
    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      brand: product.brand,
      discount: product.discount,
      category: product.category,
      rating: product.rating,
      star: product.star,
      stock: product.stock,
      properties: product.properties,
      about: product.about,
      images: product.images,
    };
  });

  return (
    <main>
      <Main />
      {/* <Product products={products} /> */}
    </main>
  );
}
