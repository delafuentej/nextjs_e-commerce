

import Link from "next/link";
import { redirect } from "next/navigation";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { IoCartOutline, IoAddCircleSharp, IoBagOutline } from "react-icons/io5";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function Cart() {

  // if(productsInCart.length === 0){
  //     redirect('/empty')
  // }

 
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        {/* title */}
      <div className="flex justify-center items-center flex-row w-300 space-x-3">
      <IoCartOutline size={50}/>
      <Title 
          className="text-center"
          title="Shopping-Cart"
          /> 
         
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div
            className="flex flex-col mt-5 "
          >
            <Link
            className="cursor-pointer"
             href="/"
            >
            <span
            className="flex justify-center align-center  text-xl  w-100 p-2 bg-black rounded font-bold  text-white text-center"
            >
              <IoAddCircleSharp size={30}/>
              Add more items
            
            </span>
            </Link>
           
            <Link
              className=" flex justify-center align-center font-bold text-center text-xl mb-5 bg-purple-500 text-white p-2 rounded cursor-pointer"
              href="/"
            >
              <IoBagOutline size={30}/>
              Keep Shopping
            </Link>
        

          {/* items  */}
            <ProductsInCart />
            </div>


          {/* checkout  className = absolute top-10 right-10*/}
           <OrderSummary />

         


        </div>
      </div>
    </div>
  );
}