
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";



interface Props {
    product: Product;
}

export const ProductsGridItem = ({product}: Props) => {
  
  const [displayImage, setDisplayImage ] = useState(product.images[0])
  
  return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link 
            href={`/product/${product.slug}`}
          >
        <Image 
            src={`/products/${displayImage}`}
            onMouseEnter={()=> setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0])}
            className="w-full object-cover rounded"
            alt={product.title}
            width={500}
            height={500}
        />
        </Link>
      <div className="p-4 flex flex-col">
          <Link 
            className="hover:text-purple-700 font-bold"
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
          <span className="font-bold">{product.price} € </span>
      </div>
    </div>
  )
}
