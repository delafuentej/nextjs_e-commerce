import { Title } from "@/components";
import Link from "next/link";
import { AddressForm } from "./ui/AddressForm";

//shipping address client
export default function Address() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



    <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
      
      <Title title="Address" subtitle="Delivery Address" />

      <AddressForm />

    </div>

  </div>
);
  
}