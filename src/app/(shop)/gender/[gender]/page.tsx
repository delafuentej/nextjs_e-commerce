//import { notFound } from "next/navigation";
//import {initialData }from '@/seed/seed';
import { Pagination, Title, ProductsGrid } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { redirect } from 'next/navigation';
import { Gender } from '@prisma/client';


//const seedProducts = initialData.products;



interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}
export default async function GenderByPage({params, searchParams}: Props) {


  const { gender } = params;
  console.log('gender', gender)

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  console.log('page', page)

  const {products, totalPages} = await getPaginatedProductsWithImages({ page, gender:gender as Gender  });
  console.log('products', products)

  
    if(products.length === 0) {
      redirect(`/gender/${gender}`);
    }

  //const products = seedProducts.filter( product => product.gender === gender);
  // if( id === 'kids'){
  //   notFound();
  // }
  const labels : Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'For all genders',
  }
  return (
    <>
      <Title 
      title={`Articles: ${labels[gender]}`}
      subtitle='All Products'
      className='mb-2 font-semibold'
    />
     {/* { (JSON.stringify(products))} */}
      <ProductsGrid 
      products={products}
     /> 
      <Pagination 
      totalPages = {totalPages}
      />
   
    </>
  );
}