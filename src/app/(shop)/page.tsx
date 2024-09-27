import { getPaginatedProductsWithImages } from "@/actions";
import { ProductsGrid, Title } from "@/components";
//import { initialData } from "@/seed/seed";


//const products = initialData.products;
//console.log('products', products)

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({searchParams}:Props) {
  
  console.log('searchParams', searchParams)
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {products} = await getPaginatedProductsWithImages({ page });
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
