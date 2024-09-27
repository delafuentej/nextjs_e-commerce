import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";


const products2 = initialData.products;
//console.log('products', products)


export default async function Home() {

  const products = await getPaginatedProductsWithImages();
  return (
   <>
    <Title 
      title='Shop'
      subtitle='All Products'
      className='mb-2'
    />
     {/* { (JSON.stringify(products))} */}
     <ProductsGrid 
      products={products2}
     />

   </>
  );
}
