'use client';

import { useAddressStore, useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from '../../../../../utils/currencyFormat';

export const PlaceOrder = () => {

    // to load store-info
    //const [loaded, setLoaded] = useState(false);

    // to obtain the address
    const address = useAddressStore( state => state.address);
    // to obtain order summary info
    const total = useCartStore((state) => state.getSummaryInfo().total);
    const totalItems = useCartStore((state) => state.getSummaryInfo().totalItems);
    const subTotal = useCartStore((state) => state.getSummaryInfo().subTotal);
    const taxes = useCartStore((state) => state.getSummaryInfo().taxes);
    


    //to avoid discrepancies between what is generated on the server side and what is generated on the client side.
   // useEffect(()=>{
    //    setLoaded(false)
   // },[]);

   // if(!loaded) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

    <h3 className="text-2xl font-bold mb-2">Delivery Address</h3>
    <div className="mb-10">
      <p className="text-xl">{address.firstName} {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.postalCode}</p>
      <p>{address.city}, {address.country} </p>
     <p>{address.phone}</p>

      </div>
      {/* diverder */}
      <div className="w-full h-0.5 rounded bg-purple-100 mb-10"/>

   

    <h2 className="text-2xl mb-2 font-bold">Order Overview</h2>
    <div className="grid grid-cols-2">

      <span>N° Items</span>
      <span className="text-right">{totalItems}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(taxes)}</span>
    
      <span className="text-2xl mt-5 font-bold">Total:</span>
      <span className="text-2xl mt-5 text-right font-bold">{currencyFormat(total)}</span>

    </div>
    <p className="mt-5 mb-5">
      <span className="text-xs">
        By clicking on our order form, you accept our <a href='#' className="underline">terms and conditions</a> of use and <a href='#' className="underline">privacy policy</a>.

      </span>

     </p>

    <div className="mt-5 mb-2 w-full bg-purple-500 font-bold hover:bg-purple-300 text-center text-white p-2 rounded">
     {/* disclaimer */}
   
      <button
      className="text-center"
      //href='/orders/123'
      >Place Order
      </button>
    </div>

  </div>
  )
}
