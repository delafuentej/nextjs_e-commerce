'use server'; 
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async() => {

    const session = await auth();

    if(!session?.user){
        return {
            ok:false,
            message:'User must be authenticated'
        }
    }
    
    try{
        const orders = await prisma.order.findMany({
           where: {
            userId: session!.user.id
           },
           include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            },
           }
        });
        return {
            ok:true,
            orders: orders,
        };


    }catch(error){
        console.log(error)
       //throw new Error(`There is no order by Id:${orderId}`)
       return {
            ok: false,
            message: `No orders`

       }
    }

}