'use client';

import Link from 'next/link';
import React from 'react'
import { IoPersonOutline, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

import { SidebarItem } from './SidebarItem';

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
          <SidebarItem 
            href='/'
            label='Profile'
            icon={IoPersonOutline}
          />
          
            {/* orders */}
            <SidebarItem 
            href='/'
            label='Orders'
            icon={IoTicketOutline}
          />

         
          {/* login */}
          <SidebarItem 
            href='/'
            label='Login'
            icon={IoLogInOutline}
          />

          {/* logout */}
          <SidebarItem 
            href='/'
            label='Logout'
            icon={IoLogOutOutline}
          />


          {/* separator */}
          <div className='w-full h-px bg-purple-300 my-10'/>
          {/* admin menu */}
            {/* products */}
            <SidebarItem 
            href='/'
            label='Products'
            icon={IoShirtOutline}
          />
          
          {/* orders */}
          <SidebarItem 
            href='/'
            label='Orders'
            icon={IoTicketOutline}
          />
          {/* users: clients */}
          <SidebarItem 
            href='/'
            label='Clients'
            icon={IoPeopleOutline}
          />


        </nav>
      
    </div>
  )
}
