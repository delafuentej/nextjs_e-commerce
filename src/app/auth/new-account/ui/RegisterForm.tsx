'use client';

import { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "@/actions";
import { login } from "@/actions";

import clsx from "clsx";


type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

}



export const RegisterForm = () => {

     const[errorMsg, setErrorMsg] = useState('')

    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>();

    const onSubmit : SubmitHandler<FormInputs>= async(data) => {
        setErrorMsg('');
       
        const {firstName, lastName, email, password} = data;
        //console.log( {firstName, lastName, email, password})
            // server action
        const resp = await registerUser(firstName, lastName, email, password);

        if(!resp.ok){
            setErrorMsg( resp.message);
            return;
        };

         await login(email.toLowerCase(), password);
        window.location.replace('/')

        console.log('resp',{resp})
    }


  return (
    <form  
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
    >

        {
            errors.firstName?.type === 'required' && (
                <span className="text-red-500">* First Name is a required field</span>
            )
        }

    <label 
        
        htmlFor="firstName">First Name</label>
      <input
        id='firstName'
        autoFocus
        className={
            clsx(
                "px-5 py-2 border bg-purple-100 rounded mb-5",
                {
                'border-red-500': errors.firstName
                }
            )
        }
        type="text" 
        {...register('firstName', {required: true})}
    />

{
            errors.lastName?.type === 'required' && (
                <span className="text-red-500">* Last Name is a required field</span>
            )
        }

    <label 
     
    htmlFor="lastName">Last Name</label>
      <input
        id='lastName'
        autoFocus
        className={
            clsx(
                "px-5 py-2 border bg-purple-100 rounded mb-5",
                {
                'border-red-500': errors.lastName
                }
            )
        }
        type="text" 
        {...register('lastName', {required: true})}
    />      

        {   
            errors.email?.type === 'required' && (
                <span className="text-red-500">* Email is a required field</span>
            )
        }

      <label 
      
      htmlFor="email">E-Mail</label>
      <input
        id='email'
        autoFocus
        className={
            clsx(
                "px-5 py-2 border bg-purple-100 rounded mb-5",
                {
                'border-red-500': errors.email
                }
            )
        }
        type="email" 
        {...register('email', {
            required: true, 
            pattern:  /^\S+@\S+$/i 
            // pattern:{
            // value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            // message: 'Please enter a valid email address'

            // }
    })}
    />
          {
            errors.password?.type === 'required' && (
                <span className="text-red-500">* Password is a required field</span>
            )
        }

      <label 

      htmlFor="password">Password</label>
      <input
        id='password'
        autoFocus
        className={
            clsx(
                "px-5 py-2 border bg-purple-100 rounded mb-5",
                {
                'border-red-500': errors.password
                }
            )
        }
        type="password" 
        {...register('password', {required: true, minLength:8})}
    />
        <span className="text-red-500">{errorMsg}</span>

        
    
           
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

    </form>
  )
}
