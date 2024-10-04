'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";


export const ProductsInCart = () => {

   const[loaded, setLoaded] = useState<boolean>(false);

   const productsInCart = useCartStore( (state) => state.cart);

   useEffect(()=>{
        setLoaded(true);
   },[]);

   if(!loaded){
    return <p>Loading...</p>
   }

   

  return (
    <>
        {
              productsInCart.map( product => (
                <div 
                className="flex bg-white border-purple-900 p-2 mb-5 shadow-lg rounded-md"
                key={`${product.slug}-${product.size}`}
                >
                  <Image 
                    src={`/products/${product.image}`}
                    className="mr-5 rounded"
                    width={100}
                    height={100}
                    alt={product.title}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  />

                  <div>
                    <span>
                        <p className="font-bold">{`${product.size}-${product.title} - ${product.quantity} Items`}</p>
                    </span>
                   
                    <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>

                  </div>

                </div>
              ))
            }
    </>
  )
}
