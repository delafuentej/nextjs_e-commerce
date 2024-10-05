

import { Title } from '@/components';
//import { initialData } from '@/seed/seed';
import Image from 'next/image';

import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions';
import { redirect } from 'next/navigation';
import { currencyFormat } from '@/utils/currencyFormat';


// const productsInCart = [
//   initialData.products[ 0 ],
//   initialData.products[ 1 ],
//   initialData.products[ 2 ],
// ];


interface Props {
  params: {
    id: string;
  };
}


export default async function OrdersById( { params }: Props ) {

  const { id } = params;

  //server actions getOrderById
  const {ok, order } = await getOrderById(id);

     if(!ok){
       redirect('/');
     }

     const address = order!.OrderAddress;
  //console.log('order',(order))
  // Todo: verificar
  // redirect(/)



  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={ `Order #${ id.split('-').at(-1) }` } />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !(order!.isPaid),
                  'bg-green-700': (order!.isPaid),
                }
              )
            }>
              <IoCardOutline size={ 30 } />
              {/* <span className="mx-2">Pendiente de pago</span> */ }
              <span className="mx-2">

                {
                  order!.isPaid ? 'Paid' : 'Pending'
                }
              </span>
            </div>



            {/* items */ }
            {
              order!.OrderItem.map( item => (

                <div key={`${item.product.slug}-${item.size}` } className="flex bg-white border-purple-900 p-2 mb-5 shadow-lg rounded-md">
                  <Image
                    src={ `/products/${ item.product.ProductImage[0].url }` }
                    width={ 100 }
                    height={ 100 }
                    style={ {
                      width: '100px',
                      height: '100px'
                    } }
                    alt={ item.product.title }
                    className="mr-5 rounded"
                  />

                  <div>
                    <p className='font-bold'>{ item.product.title }</p>
                    <p>{currencyFormat(item.price) } x {item.quantity}</p>
                    <p className="font-semibold">Subtotal: ${currencyFormat(item.price * item.quantity )}</p>
                  </div>

                </div>


              ) )
            }
          </div>

          {/* Checkout */ }
          <div className="bg-white rounded-xl shadow-xl p-7">

          <h3 className="text-2xl font-bold mb-2">Delivery Address</h3>
          <div className="mb-10">
          <p className="text-xl">{address!.firstName} {address!.lastName}</p>
          <p>{address!.address}</p>
          <p>{address!.postalCode}</p>
          <p>{address!.city}, {address!.countryId} </p>
          <p>{address!.phone}</p>

      </div>
            {/* Divider */ }
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>

            <div className="grid grid-cols-2">

              <span>N° Items</span>
              <span className="text-right">{(order!.totalItems === 1) ? '1 Item' : `${order!.totalItems} Items`}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Taxes (15%)</span>
              <span className="text-right">{currencyFormat(order!.taxes)}</span>
            
              <span className="text-2xl mt-5 font-bold">Total:</span>
              <span className="text-2xl mt-5 text-right font-bold">{currencyFormat(order!.total)}</span>



            </div>

            <div className="mt-5 mb-2 w-full">

              <div className={
                clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': !(order!.isPaid),
                    'bg-green-700': order!.isPaid,
                  }
                )
              }>
                <IoCardOutline size={ 30 } />
                {/* <span className="mx-2">Pendiente de pago</span> */ }
                <span className="mx-2">
                  {
                     order!.isPaid ? 'Paid' : 'Pending'
                  }
                </span>
              </div>

            </div>


          </div>



        </div>



      </div>


    </div>
  );
}