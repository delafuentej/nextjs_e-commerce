import { Title } from "@/components";
import Link from "next/link";
import {   IoBagCheckOutline, IoCartOutline,  IoPencilOutline } from "react-icons/io5";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";




export default function CheckOut() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        {/* title */}
      <div className="flex justify-center items-center flex-row w-300 space-x-3">
      <IoBagCheckOutline size={40}/>
      <Title 
          className="text-center"
          title="Verify Order"
          /> 
         
      </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div
            className="flex flex-col mt-5 "
          >
            <Link
            className="cursor-pointer"
             href="/cart"
            >
            <span
            className="flex justify-center align-center  text-xl  w-100 p-2 bg-black rounded font-bold  text-white text-center"
            >
              <IoCartOutline size={30}/>
              Modify Shopping-Cart
            
            </span>
            </Link>
           
            <Link
              className=" flex justify-center align-center font-bold text-center text-xl mb-5 bg-purple-500 text-white p-2 rounded cursor-pointer"
              href="/cart"
            >
            <IoPencilOutline size={30}/>
              Edit Shopping-Cart
            </Link>
        

          {/* items  */}
            <ProductsInCart />
            </div>
          {/* checkout */}
            <PlaceOrder />


        </div>
      </div>
    </div>
  );
}