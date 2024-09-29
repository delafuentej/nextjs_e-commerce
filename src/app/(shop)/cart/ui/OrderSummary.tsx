'use client';

import Link from "next/link";
import {  useEffect, useState} from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";


export const OrderSummary = () => {

    const[loaded, setLoaded] = useState<boolean>(false);
    // code to fix the Error : Error: Maximum update depth exceeded.
    const total = useCartStore((state) => state.getSummaryInfo().total);
    const totalItems = useCartStore((state) => state.getSummaryInfo().totalItems);
    const subTotal = useCartStore((state) => state.getSummaryInfo().subTotal);
    const taxes = useCartStore((state) => state.getSummaryInfo().taxes);
  // const { totalItems, total, subTotal, taxes} = useCartStore((state) => state.getSummaryInfo());

       // Memorize summary values to avoid unnecessary rerenderings
      //  const summaryInfo = useCartStore((state) => state.getSummaryInfo());

      //  const { total, totalItems, subTotal, taxes } = useMemo(() => summaryInfo, [summaryInfo]);
   
    //console.log('info', info)

    useEffect(()=>{
        setLoaded(true);
    },[]);

    if(!loaded){
        <p>Loading...</p>
    }
    
    
  return (
    <div className=" bg-white rounded-xl shadow-xl p-7 h-fit">
    <h2 className="text-2xl mb-2 font-bold text-center">Order Summary</h2>
    <div className="grid grid-cols-2">

      <span className="font-bold">N° Items</span>
      <span className="text-right">
        {totalItems === 1 ? '1 Item'  : `${totalItems} Items`}
      </span>

      <span className="font-bold">Subtotal</span>
      <span className="text-right">{`${currencyFormat(subTotal)}`}</span>

      <span className="font-bold">Taxes (15%)</span>
      <span className="text-right">{`${currencyFormat(taxes)}`}</span>
    
      <span className="text-2xl mt-5 font-bold">Total:</span>
      <span className="text-2xl mt-5 text-right font-bold">{`${currencyFormat(total)}`}</span>

    </div>
    <div className="mt-5 mb-2 w-full bg-purple-500 font-bold hover:bg-purple-300 text-center text-white p-2 rounded">
          <Link
            className="text-center"
            href='/checkout/address'
            >Checkout
          </Link>
        </div>

  </div>)
}
