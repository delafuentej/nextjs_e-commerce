'use client';


import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";


export const ProductsInCart = () => {

   const[loaded, setLoaded] = useState<boolean>(false);

   const productsInCart = useCartStore( (state) => state.cart);

   const updateProductQuantity = useCartStore( (state) => state.updateProductQuantity);

   const removeProduct = useCartStore ((state) => state.removeProductFromCart);

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
                  <ProductImage 
                    src={product.image}
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
                    <Link
                        className="cursor-pointer hover:underline"
                        href={`/product/${product.slug}`}
                    >
                        <p className="font-bold">{`${product.size}-${product.title}`}</p>
                    </Link>
                   
                    <p>{`${product.price} €`}</p>
                    <QuantitySelector 
                    onQuantitySelected={(quantity)=> updateProductQuantity(product,quantity)}
                    quantity={product.quantity}
                    />

                    <button 
                    onClick={() => removeProduct(product)}
                    className="mt-3 bg-purple-500 hover:bg-purple-300 text-white p-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))
            }
    </>
  )
}
