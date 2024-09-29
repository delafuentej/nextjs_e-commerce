'use client';

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'

export const TopMenu = () => {

  const openMenu = useUIStore( state => state.openSidebar);
  const totalItems = useCartStore ( state => state.getTotalItems());

  //useState => to obtain totalItems from client side
  const [loaded, setLoaded] = useState(false);

  useEffect(()=> {
    setLoaded(true);
  },[]);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* logo */}
      <div>
        <Link
         href="/"
         >
          <span className={`${titleFont.className} antialiased font-bold`}>PASSION</span>
          <span> | Online-Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className='hidden sm:block'>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/gender/men"
        > Men</Link>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/gender/women"
        > Women</Link>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/gender/kid"
        > Kid</Link>

      <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/gender/unisex"
        > Unisex</Link>


      </div>

      {/* Search, Cart, Manu */}
      <div className='flex items-center'>

        <Link
          className='mx-2'
          href='/search'
        >
          <IoSearchOutline className='w-5 h-5'/>
        </Link>


        <Link
          className='mx-2'
          href={
            ((totalItems === 0 && loaded)) ? '/empty' : '/cart'
          }
        >
          <div className='relative'>
            {/* span => num. items in shopping-cart */}
            {
             (loaded && totalItems > 0) && (
              <span 
                className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 text-white bg-purple-500'>
                {totalItems}
              </span>
             )
            }
           
            <IoCartOutline className='w-5 h-5'/>
          </div>
         
        </Link>

        {/* menu button */}
        <button
        onClick={openMenu}
        className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
        >
          Menu
        </button>


       

      </div>
     
    </nav>
  )
}
