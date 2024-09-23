
import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function NewAccount() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>New Account</h1>

      <div className="flex flex-col">

      <label htmlFor="firstName">First Name</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="text" />

      <label htmlFor="lastName">Last Name</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="text" />      


        <label htmlFor="email">E-Mail</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="email" />


        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="email" />

        <button
          
          className="bg-purple-500 hover:bg-purple-300 rounded text-white p-2 font-bold">
          Create
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="bg-purple-500 hover:bg-purple-300 rounded text-white p-2 font-bold text-center">
          Login
        </Link>

      </div>
    </div>
  );
}