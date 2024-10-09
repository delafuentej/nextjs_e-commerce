'use server';

import prisma from "@/lib/prisma";


export const deleteUserAddress = async(userId: string) => {
    try{
        const deletedAddress = await prisma.userAddress.delete({
            where: {userId}
        })
        return{
            ok:true,
            deletedAddress: deletedAddress,
        }

    }catch(error){
        console.log(error)
        throw new Error(`Address could not be deleted by userId: ${userId}`)
    }
}