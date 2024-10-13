import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

// redirection page when customer has no items in shopping cart
export default function Empty() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={100} className="mx-5"/>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-5">Your Shoping-Cart is empty</h1>

       <Link
       href='/'
       className="btn btn-primary text-xl"
       >
        Go Back
       </Link>
      </div>
    </div>
  );
}