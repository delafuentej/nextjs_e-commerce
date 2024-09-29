'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";



interface Props {
    product: Product;
}

export const AddToCart = ({product}:Props) => {

  const addProductToCart = useCartStore( state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = () => {
        setPosted(true);
        if(!size) return;

        const cartProduct: CartProduct = {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price
,         quantity: quantity,
          size: size,
          image: product.images[1],
        }
       addProductToCart(cartProduct);
       setPosted(false);
       setQuantity(1);
       setSize(undefined);
      // window.prompt('Added to cart');
    }

  return (
    <>
        {
            posted && !size && 
            (
                <span className="mt-9 text-red-500 font-bold fade-in">
                Please select a product size
                </span>
            )
        }
      
           {/* size selector */}
           <SizeSelector 
            availableSizes={product.sizes}
            selectedSize={size}
            onSizeSelected={(size) => setSize(size)}
          />

          {/* quantity selector */}
          <QuantitySelector
            onQuantitySelected = {(quantity) => setQuantity(quantity)}
            quantity={quantity}
          />
         {/* button : add to cart */}
        <button 
          onClick={addToCart}
          className="btn bg-purple-500 font-bold text-white py-2 px-4 rounded
           my-5 hover:bg-purple-900">
            Add to Cart
          </button>
    
    
    </>
  )
}
