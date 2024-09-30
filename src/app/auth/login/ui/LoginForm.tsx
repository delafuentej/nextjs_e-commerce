'use client';

import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);
    console.log('state', {state});
  return (
    <form 
        action={dispatch}
        className="flex flex-col">

        <label htmlFor="email">E-Mail</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="email" 
          name="email"
        />


        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded mb-5"
          type="password" 
          name="password"
        />

        <button
            type='submit'
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

      </form>
  )
}
