'use server';

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddres = async(address: Address, userId: string) => {
    try{
       const newAddress = await createOrReplaceAddress(address, userId)
       
        return {
            ok:true,
            address: newAddress,
        }
    }catch(error) {
        console.log(error);
        return {
            ok: false,
            message: 'Address could not be recorded'
        };
    }
}

const createOrReplaceAddress = async(address: Address, userId: string) => {
    try{
        const storedAddress = await prisma.userAddress.findUnique({
            where: {userId}
        });

        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            
          }

        if(!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave,
            });
            return newAddress;
        }
        const updatedAddress = await prisma.userAddress.update({
            where: {userId},
            data: addressToSave,
        });
        return updatedAddress;

    }catch(error){
        console.log(error);
        throw new Error('Address could not be saved')
    }
}