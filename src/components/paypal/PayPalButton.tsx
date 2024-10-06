'use client';


import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React from 'react'

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if(isPending){
    return(
      <div className='animate-pulse mb-20'>
        <div className='h-10 bg-purple-200 rounded'></div>
        <div className='h-10 mt-2 bg-purple-300 rounded'></div>
      </div>
    )
  }
  return (
    <>
      <PayPalButtons />
    </>
  )
}
