// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedOrders } from '@/actions';
import { Title, Pagination } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';


export default async function Orders() {

  const {ok, orders} = await getPaginatedOrders();

  if(!ok){
    redirect('/auth/login');
  }
 
  console.log('orders',orders);
  return (
    <>
      <Title title="Orders-Admin" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-purple-500  text-white font-bold border-b">
            <tr>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
              Full Name
              </th>
              <th scope="col" className="text-sm px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm  px-6 py-4 text-left">
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
                    <Link href={`/orders/${order.id}`} className="bg-purple-500 hover:bg-purple-300 p-2 text-white font-bold hover:bg-purple-400 rounded ">
                      Order view
                    </Link>
                  </td>
    
                </tr>
              


              ))
            }

          </tbody>
        </table>
        <Pagination totalPages={3}/>
      </div>
    </>
  );
}