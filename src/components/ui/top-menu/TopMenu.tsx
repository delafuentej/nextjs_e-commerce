'use client';

import { titleFront } from '@/config/fonts'
import { useUIStore } from '@/store'
import Link from 'next/link'
import React from 'react'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'

export const TopMenu = () => {

  const openMenu = useUIStore( state => state.openSidebar);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* logo */}
      <div>
        <Link
         href="/"
         >
          <span className={`${titleFront.className} antialiased font-bold`}>PASSION</span>
          <span> | Online-Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className='hidden sm:block'>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/category/men"
        > Men</Link>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/category/women"
        > Women</Link>

        <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/category/kid"
        > Kid</Link>

      <Link 
          className='m-2 p-2 rounded-md transition-all hover:bg-purple-200'
          href="/category/unisex"
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
          href='/cart'
        >
          <div className='relative'>
            {/* span => num. items in shopping-cart */}
            <span 
              className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 text-white bg-purple-500'>2</span>
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
