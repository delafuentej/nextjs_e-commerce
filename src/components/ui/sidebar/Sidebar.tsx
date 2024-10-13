'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { IoPersonOutline, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { SidebarItem } from './SidebarItem';
import { useCartStore, useUIStore } from '@/store';
import { clsx } from 'clsx';
import { logout } from '@/actions';


export const Sidebar = () => {

       
       
 
        const clearCart = useCartStore(state => state.clearCart)
        const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
        const closeMenu = useUIStore( state => state.closeSidebar);

        //to obtain the session from client side
        const {data: session} = useSession();

        const isAuthenticated : boolean = !!session?.user;

        const isAdmin : boolean = session?.user.role === 'admin';


        const refreshPage = () => {
          window.location.replace('/auth/login');
        }

        
       //console.log('session', session)
       // console.log('isAdmin',isAdmin);
  return (
    <div>

      { isSidebarOpen && (
        //  black bg 
          <div 
          className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
         />
      )}

      { isSidebarOpen && (
        //  blur effect
        <div 
        onClick={closeMenu}
        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
      /> 
      )}
     
        {/* SideMsanu */}
        <nav
          // slide effect
          className={
            clsx(
              'fixed p-5 right-0 top-0 w-[500px] h-screen z-20 bg-black opacity-80 shadow-2xl transform transition-all duration-300',
              {
                "translate-x-full": !isSidebarOpen
              }
            )
          }
        >
          <IoCloseOutline 
            onClick={closeMenu }
            className='absolute top-5 right-5 cursor-pointer text-white animate-pulse' 
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
            className='w-full bg-neutral-50 font-bold rounded pl-10 py-1 pr-10 border-b-2 text-xl border-purple-900 focus:outline-none focus:border-purple-400'
            type='text'
            placeholder='Search'


            />
          </div>

          {/* options menu */}

          {
            isAuthenticated && (
              <>
              {/* profile */}
              <SidebarItem 
              href='/profile'
              label='Profile'
              onClick={() => closeMenu()}
              icon={IoPersonOutline}
            />
            
              {/* orders */}
              <SidebarItem 
              href='/orders'
              label='Orders'
              onClick={() => closeMenu()}
              icon={IoTicketOutline}
            />
            
              </>
             
            )
          }

          {/* profile */}
        
           {
              isAuthenticated ? (
                    // logout
                <SidebarItem 
                href='/'
                label='Logout'
                icon={IoLogOutOutline}
                onClick = {() =>{ logout(); closeMenu(); clearCart(); refreshPage() }}
        />
              ) :
              (
                // login
                <SidebarItem 
                href='/auth/login'
                label='Login'
                icon={IoLogInOutline}
                onClick={() => closeMenu()}
              />
              )
           }

            {/* admin menu */}

           {
            isAdmin && (
              <>
              
                {/* separator */}
            <div className='w-full h-px bg-purple-300 my-10'/>
            {/* products */}
            <SidebarItem 
            href='/admin/products'
            label='Products'
            icon={IoShirtOutline}
            onClick={() => closeMenu()}
          />
          
          {/* orders */}
          <SidebarItem 
            href='/admin/orders'
            label='Orders'
            icon={IoTicketOutline}
            onClick={() => closeMenu()}
          />
          {/* users: clients */}
          <SidebarItem 
            href='/admin/users'
            label='Users'
            icon={IoPeopleOutline}
            onClick={() => closeMenu()}
          />
              </>
            )
           }
       
        </nav>
      
    </div>
  )
}
