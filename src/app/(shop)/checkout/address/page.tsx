import { Title } from "@/components";
import Link from "next/link";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

//shipping address client
export default async function Address() {

  const countries = await getCountries();

  const session = await auth();
  if(!session?.user){
    <h3 className="text-red-500 text-5xl">No User Session</h3>
  }

  const userAddress = await getUserAddress(session!.user.id) ?? undefined;
  console.log('userAddress', {userAddress})
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



    <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
      
      <Title title="Address" subtitle="Delivery Address" />

      <AddressForm 
      countries={countries}
      userStoredAddress={userAddress}
      />

    </div>

  </div>
);
  
}