import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
//import { initialData } from "@/seed/seed";


//const products = initialData.products;
//console.log('products', products)


export default async function Home() {

  const {products} = await getPaginatedProductsWithImages();
  //console.log('products', products)
  return (
   <>
    <Title 
      title='Shop'
      subtitle='All Products'
      className='mb-2'
    />
     {/* { (JSON.stringify(products))} */}
     <ProductsGrid 
      products={products}
     />

   </>
  );
}
