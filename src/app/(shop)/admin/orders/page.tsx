// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedOrders } from '@/actions';
import { Title, Pagination } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';



interface Props {
  searchParams: {
    page?: string
  }
};
   
export default async function Orders({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
     
  const {ok, orders, totalPages} = await getPaginatedOrders({page});

  if(!ok){
    redirect('/auth/login');
  }
 
  console.log('orders',orders);
  return (
    <>
      <Title title="Orders-Admin" />

      <div className="mb-10">
        <table className="min-w-full shadow-lg rounded-lg">
          <thead className="bg-purple-500  text-white border-b">
            <tr>
              <th scope="col" className="text-md px-6 py-4 text-left font-extrabold">
                #ID
              </th>
              <th scope="col" className="text-md  px-6 py-4 text-left font-extrabold">
              Full Name
              </th>
              <th scope="col" className="text-md px-6 py-4 text-left font-extrabold">
                Status
              </th>
              <th scope="col" className="text-md  px-6 py-4 text-left font-extrabold">
                Options
              </th>
            </tr>
          </thead>
          <tbody>

            {
              orders?.map( order => (
              
                  <tr
                  key={order!.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-bold">{order!.id.split('-').at(-1)?.toUpperCase()}</td>
                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {order!.OrderAddress!.firstName} {order!.OrderAddress!.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                    {
                      order!.isPaid ? 
                      (
                        <div className='font-bold inline-flex'>
                           <IoCardOutline className="mx-2 text-green-800" />
                            <span className='mx-2 text-green-800'>Paid</span>
                        </div>

                      ):
                      (
                        <div className='font-bold inline-flex'>
                           <IoCardOutline className="mx-2 text-red-800" />
                           <span className='mx-2 text-red-800'>Pending</span>

                        </div>
                      )
                    
                    }
  
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${order.id}`} className="btn btn-primary">
                      Order view
                    </Link>
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