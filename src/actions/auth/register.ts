import prisma from "@/lib/prisma";
import bcrypjs from 'bcryptjs';


export const registerUser = async(
    firstName: string,
    lastName: string, 
    email: string, 
    password: string,
) => {
    try{
        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: bcrypjs.hashSync(password)
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            }
        });
        return {
            ok: true,
            user: user,
            message: 'User was successfully created'
        }


    }catch(error){
        console.log(error);
        return {
            ok:false,
            message:'User could not be created'
        }
    }


}