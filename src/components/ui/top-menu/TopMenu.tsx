'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store';
import { TopMenuCenterItem } from './TopMenuCenterItem';


import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';



const topMenuCenterItems = [
  {
    path:'/gender/men',
    title: 'Men',

  },
  {
    path:'/gender/women',
    title: 'Women',

  },
  {
    path:'/gender/kid',
    title: 'Kid',

  },
  {
    path:'/gender/unisex',
    title: 'Unisex',

  },

]

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
          <span className={`${titleFont.className} antialiased font-bold`}>PASSION | Online-Shop</span>
         
        </Link>
      </div>
      {/* top menu center */}
      <div className='hidden sm:block'>

        {
          topMenuCenterItems.map(item => (
            <TopMenuCenterItem 
            key={item.title} 
            href={item.path}
            title={item.title}
            />
          ))
        }

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
          <div className='relative p-2  hover:bg-purple-400 rounded hover:text-white hover:fade-in'>
            {/* span => num. items in shopping-cart */}
            {
             (loaded && totalItems > 0) && (
              <span 
                className='px-1 absolute text-xs rounded-full  font-bold -top-1 -right-1 text-white bg-purple-500 animate-bounce'>
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
        className='m-2 p-2 font-bold rounded-md transition-all hover:bg-purple-400 hover:text-white'
        >
          Menu
        </button>
      </div>
     
    </nav>
  )
}
