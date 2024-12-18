// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { Pagination } from '@/components';


interface Props {
  searchParams: {
    page?: string
  }
};

export default async function OrdersList({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
     
  const {ok, orders, totalPages} = await getOrdersByUser({page});

  if(!ok){
    redirect('/auth/login');
  }
 
 // console.log('orders',orders);
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full shadow-lg rounded-lg">
          <thead className="bg-purple-500  font-extrabold text-white border-b">
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

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order!.id.split('-').at(-1)}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order!.OrderAddress!.firstName} {order!.OrderAddress!.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                    {
                      order!.isPaid ? 
                      (
                        <>
                           <IoCardOutline className="mx-2 text-green-800" />
                            <span className='mx-2 text-green-800'>Paid</span>
                        </>

                      ):
                      (
                        <>
                           <IoCardOutline className="mx-2 text-red-800" />
                           <span className='mx-2 text-red-800'>Pending</span>

                        </>
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
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}