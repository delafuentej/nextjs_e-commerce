// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedProductsWithImages } from '@/actions';
import { Title, Pagination, ProductImage } from '@/components';
import Link from 'next/link';
import {  IoAddOutline } from 'react-icons/io5';
import { currencyFormat } from '@/utils/currencyFormat';


interface Props {
  searchParams: {
    page?: string
  }
}
export default async function Products({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;


  const {products, totalPages, currentPage} = await getPaginatedProductsWithImages({ page });



  console.log('products',products);
  return (
    <>
      <Title title="Products Maintenance" />

      <div className='flex justify-end mb-5 '>

          <Link className=' flex bg-purple-500 text-white hover:bg-purple-300 cursor-pointer px-4 py-3 rounded-xl font-bold' href='/admin/product/new'>
          <IoAddOutline className='font-extrabold' size={20} />
          New Product
          </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-purple-500  text-white font-bold border-b">
            <tr>
           
              <th scope="col" className="text-sm  px-6 py-4 text-left">
              Product-Id
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
              Photo
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" className="text-sm px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>

            {
              products!.map( product => (
              
                  <tr
                  key={product!.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-100">

                     {/* product id */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-purple-800 font-bold">{product!.id.split('-').at(-1)?.toUpperCase()}</td>

                  {/* img product*/}
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-bold">
                  <Link
                  href={`/product/${product.slug}`}
                
                  >
                    <ProductImage
                      src={product!.ProductImage[0]?.url}
                      width={90}
                      height={90}
                      alt={product!.title}
                      className='w-20 h-20 object-cover rounded cursor-pointer'
                    />
                  
                  </Link>
                   
                  </td>  
                 
                  {/* product title */}
                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    <Link
                    href={`/admin/product/${product.slug}`}
                    className='font-bold hover:underline hover:text-purple-500' 
                    >
                     {product!.title}
                    </Link>
                  </td>
                  {/* price */}
                  <td className=" text-sm  text-purple-800 font-bold px-6 py-4 whitespace-nowrap">

                   {currencyFormat(product!.price)}
  
                  </td>


                  {/* genre */}
                  <td className=" text-sm text-purple-900 font-semibold px-6 py-4 whitespace-nowrap">
                      {(product!.gender).charAt(0).toUpperCase() + (product!.gender).slice(1)}
                  </td>
                {/* stock */}
                  <td className=" text-sm text-purple-900 font-bold px-6 py-4 whitespace-nowrap">
                      {product!.inStock}
                  </td>
                   {/* sizes */}
                   <td className=" text-sm text-purple-900 font-semibold px-6 py-4 whitespace-nowrap">
                      {product!.sizes.join(', ')}
                  </td>

    
                </tr>
              


              ))
            }

          </tbody>
        </table>
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}