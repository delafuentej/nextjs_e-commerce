'use client';

import Link from 'next/link';
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import Login from '../../../app/auth/login/page';

export const Sidebar = () => {
  return (
    <div>

      {/* black bg */}
      <div 
        className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
       />

      {/* blur */}
      <div 
        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
      /> 
        {/* SideMsanu */}
        <nav
          // slide effect
          className='fixed p-5 right-0 top-0 w-[500px] h-screen bg-purple-50 z-20  shadow-2xl transform transition-all duration-300'
        >
          <IoCloseOutline 
            onClick={()=> console.log('click')}
            className='absolute top-5 right-5 cursor-pointer' 
            size={50}
          />
          {/* input */}
          <div
            className='relative mt-14'
          >
            <IoSearchOutline 
              className='absolute top-2 left-2'
            size={20}
            />
            <input 
            className='w-full  bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-purple-400'
            type='text'
            placeholder='Search'


            />
          </div>

          {/* options menu */}

          {/* profile */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoPersonOutline 
              size={30}
            />
            <span className='text-xl ml-3'>Profile</span>
          </Link>
            {/* orders */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoTicketOutline 
              size={30}
            />
            <span className='text-xl ml-3'>Orders</span>
          </Link>
          {/* login */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoLogInOutline 
              size={30}
            />
            <span className='text-xl ml-3'>Login</span>
          </Link>
          {/* logout */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoLogOutOutline
              size={30}
            />
            <span className='text-xl ml-3'>Logout</span>
          </Link>

          {/* separator */}
          <div className='w-full h-px bg-purple-300 my-10'/>
          {/* admin menu */}
            {/* products */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoShirtOutline
              size={30}
            />
            <span className='text-xl ml-3'>Products</span>
          </Link>
          {/* orders */}
          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoTicketOutline
              size={30}
            />
            <span className='text-xl ml-3'>Products</span>
          </Link>

          <Link
            href='/'
            className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
          >
            <IoPeopleOutline
              size={30}
            />
            <span className='text-xl ml-3'>Clients</span>
          </Link>

        </nav>
      
    </div>
  )
}
