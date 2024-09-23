import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoCart, IoAddOutline, IoAddCircleSharp, IoFingerPrintSharp, IoHandRightSharp, IoFingerPrintOutline, IoHandLeftOutline, IoBagHandle, IoBagAddOutline, IoBagOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[5],
  initialData.products[8],
];

export default function Cart() {
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
          </div>

          {/* items  */}
            {
              productsInCart.map( product => (
                <div 
                className="flex border-purple-900 p-2"
                key={product.slug}
                >
                  <Image 
                    src={`/products/${product.images[0]}`}
                    className="mr-5 rounded"
                    width={100}
                    height={100}
                    alt={product.title}
                  />

                  <div>
                    <p className="font-bold">{product.title}</p>
                    <p>{`${product.price} €`}</p>
                    <QuantitySelector 
                    quantity={1}
                    />

                    <button 
                    className="mt-3 bg-purple-500 hover:bg-purple-300 text-white p-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))
            }

          {/* checkout */}

        </div>
      </div>
    </div>
  );
}