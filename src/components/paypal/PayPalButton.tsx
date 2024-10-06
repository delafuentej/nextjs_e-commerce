'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {CreateOrderData, CreateOrderActions} from '@paypal/paypal-js';
import { setTransactionId } from '@/actions';


interface Props {
  orderId: string;
  amount: number;
}


export const PayPalButton = ({orderId, amount}: Props) => {
  console.log('orderId', orderId)
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100))/100;


  if(isPending){
    return(
      <div className='animate-pulse mb-20'>
        <div className='h-10 bg-purple-200 rounded'></div>
        <div className='h-10 mt-2 bg-purple-300 rounded'></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    try{
      const transactionId = await actions.order.create({
        purchase_units:[
            {
           
             amount: {
              
              value: `${roundedAmount}`,
             // currency_code:'EUR',
             }
            }
          ]
      })
     // console.log('transactionId',{transactionId});
      // actions/payments/setTransactionId
      const { ok } = await setTransactionId(orderId, transactionId);
      if(!ok){
        throw new Error(`Order could not be updated`)
      }
      return transactionId;

    }catch(error){
      console.error('Error creating order:', error);
      throw error;
    }

  
  }

  return (
    <>
      <PayPalButtons 
      //callbacks: createOrder, onApprove
        createOrder={createOrder}
        //onApprove={}
      />
    </>
  )
}
