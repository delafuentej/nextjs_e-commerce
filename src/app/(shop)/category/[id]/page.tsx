//import { notFound } from "next/navigation";
import {initialData }from '@/seed/seed';
import { Title } from '@/components';
import { ProductsGrid } from '@/components';
import type { Category } from '@/interfaces';

const seedProducts = initialData.products;



interface Props {
  params: {
    id: Category;
  }
}
export default function Category({params}: Props) {
  const {id} = params;

  const products = seedProducts.filter( product => product.gender === id);
  // if( id === 'kids'){
  //   notFound();
  // }
  const labels : Record<Category, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'For all genders',
  }
  return (
    <>
      <Title 
      title={`Articles: ${labels[id]}`}
      subtitle='All Products'
      className='mb-2 font-semibold'
    />
     {/* { (JSON.stringify(products))} */}
      <ProductsGrid 
      products={products}
     />

   
    </>
  );
}