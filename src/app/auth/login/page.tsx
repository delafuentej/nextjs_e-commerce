import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>Login</h1>

      <div className="flex flex-col">

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
          Login
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="bg-purple-500 hover:bg-purple-300 rounded text-white p-2 font-bold text-center">
          Create a new account
        </Link>

      </div>
    </div>
  );
}