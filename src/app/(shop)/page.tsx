export const revalidate = 60; //60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";
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


  const {products, totalPages} = await getPaginatedProductsWithImages({ page });
  console.log('products', products)
  //console.log('currentPage', currentPage, 'totalPages', totalPages)
  if(products.length === 0) redirect('/');
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
     <Pagination 
      totalPages={totalPages}
     />

   </>
  );
}
