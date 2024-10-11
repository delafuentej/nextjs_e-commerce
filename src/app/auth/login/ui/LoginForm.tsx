'use client';
import { useEffect } from "react";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
//import { useRouter } from "next/navigation";


export const LoginForm = () => {

    //const router = useRouter();

    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(()=>{
      if( state === 'Success'){
        //router.replace('/');
        // refresh web browser =>  window.location.replace('/');
        window.location.replace('/');
      }
    },[state]);

   // console.log('state', {state});
  return (
    
    <form 
        action={dispatch}
        className="flex flex-col max-w-md mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

        <label 
        className="text-sm font-semibold"
        htmlFor="email"
        
        >E-Mail</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          type="email" 
          name="email"
        />


        <label 
        htmlFor="email"
        className="text-sm font-semibold"
        >Password</label>
        <input
          className="px-5 py-2 border bg-purple-100 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          type="password" 
          name="password"
        />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live='polite'
          aria-atomic='true'
        >
          {  state === 'Invalid credentials.' && (
            <div
              className="flex items-center space-x-2 text-red-500"
            >
            <IoInformationOutline className="h-5 w-5" />
            <p className="text-sm">Invalid Credentials</p>
          </div>
          )
          }

        </div>

        {/* button login */}
       <LoginButton />

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-2 text-gray-500">O</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300 rounded text-white py-2 font-bold text-center">
          Create a new account
        </Link>

      </form>

      
  )
}

function LoginButton(){
  const {pending} = useFormStatus();

  return(
     <button
          type='submit'
          disabled={ pending }
          className={
            clsx(
            "rounded py-2 font-bold text-white transition-colors duration-300",
            {
              "bg-purple-500 hover:bg-purple-600": !pending,
              "bg-gray-300 cursor-not-allowed": pending,
            }
            )
          }
          >
          Login
    </button>
  )
}
