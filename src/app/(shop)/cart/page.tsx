import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoAddCircleSharp, IoBagOutline } from "react-icons/io5";

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
        

          {/* items  */}
            {
              productsInCart.map( product => (
                <div 
                className="flex bg-white border-purple-900 p-2 mb-5 shadow-lg rounded-md"
                key={product.slug}
                >
                  <Image 
                    src={`/products/${product.images[0]}`}
                    className="mr-5 rounded"
                    width={100}
                    height={100}
                    alt={product.title}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
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
            </div>
          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 text-center">Order Overview</h2>
            <div className="grid grid-cols-2">

              <span>N° Items</span>
              <span className="text-right">3 Items</span>

              <span>Subtotal</span>
              <span className="text-right">200 €</span>

              <span>Taxes (15%)</span>
              <span className="text-right">30 €</span>
            
              <span className="text-2xl mt-5">Total:</span>
              <span className="text-2xl mt-5 text-right">230 €</span>

            </div>

            <div className="mt-5 mb-2 w-full bg-purple-500 font-bold hover:bg-purple-300 text-center text-white p-2 rounded">
              <Link
              className="text-center"
              href='/checkout/address'
              >Checkout
              </Link>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}