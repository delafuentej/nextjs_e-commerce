'use client';

import Link from 'next/link'

export const AddressForm = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">


    <div className="flex flex-col mb-2">
      <span>First Name</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>

    <div className="flex flex-col mb-2">
      <span>Surname</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>

    <div className="flex flex-col mb-2">
      <span>Address</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>

    <div className="flex flex-col mb-2">
      <span>Address 2 (opcional)</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>


    <div className="flex flex-col mb-2">
      <span>Zip Code</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>

    <div className="flex flex-col mb-2">
      <span>City</span>
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>

    <div className="flex flex-col mb-2">
      <span>Country</span>
      <select 
        className="p-2 border rounded-md bg-purple-100"
      >
        <option value="">[ Select ]</option>
        <option value="SPA">Spain</option>
      </select>
    </div>

    <div className="flex flex-col mb-2">
      <span>Phone</span>f
      <input 
        type="text" 
        className="p-2 border rounded-md bg-purple-100"
      />
    </div>
    <div className='flex flex-col mb-2 sm:mt-1'>


    {/* tailwind checkbox */}
    <div className="inline-flex items-center mb-10">
        <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
    // dataRippleark="true"
         >
        <input
            type="checkbox"
            className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500 hover:before:opacity-10"
            id="checkbox"
            //checked
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
        >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  </label>
    <span>Remember Address?</span>
</div>



    <div className="flex flex-col mb-2 sm:mt-10">
      <Link 
        href='/checkout'
        className="bg-purple-500 hover:bg-purple-300 rounded text-white font-bold p-2 flex w-full sm:w-1/2 justify-center ">
        Next
      </Link>
    </div>

    </div>
  </div>
  )
}
