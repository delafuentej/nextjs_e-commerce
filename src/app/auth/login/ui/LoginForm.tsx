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
        <div
          className="flex h-8 items-end space-x-1"
          aria-live='polite'
          aria-atomic='true'
        >
          {  state === 'Invalid credentials.' && (
            <div
              className=" flex mb-4"
            >
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid Credentials</p>
          </div>
          )
          }

        </div>

        {/* button login */}
       <LoginButton />

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

function LoginButton(){
  const {pending} = useFormStatus();

  return(
     <button
          type='submit'
          className={
            clsx({
              "bg-purple-500 hover:bg-purple-300 rounded text-white p-2 font-bold": !pending,
              "btn-disabled": pending
            })
          }
          disabled={ pending }
          >
          Login
    </button>
  )
}
