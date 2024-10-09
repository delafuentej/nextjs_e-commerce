'use client';

import  { useEffect, useState } from 'react'
import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts'


interface Props {
    slug: string;
}
export const StockLabel = ({slug}: Props) => {

    const [stock,  setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(()=> {
        const getStock = async() => {
            // call to server actions
            const inStock = await getStockBySlug(slug);
            setStock(inStock);
            setIsLoading(false);
            console.log('inStock', inStock);
        }
        getStock();
    },[slug]);

    

  return (
    <>

        {
            isLoading ? (
                <h1 className={`${titleFont.className} antialiased font-bold text-lg bg-purple-200 animate-pulse`}> &nbsp;
                </h1>
               
            ) : (
                <h1 className={`${titleFont.className} antialiased font-bold text-lg`}> Stock: {stock}
                </h1>
            )
        }
        
    </>
   
  )
}
