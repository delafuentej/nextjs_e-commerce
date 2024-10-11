'use server'; 
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


interface PaginationOptions {
    page?: number;
    take?: number;
};

export const getOrdersByUser = async({
    page = 1,
    take = 10,
}: PaginationOptions) => {

    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;


    const session = await auth();

    if(!session?.user){
        return {
            ok:false,
            message:'User must be authenticated'
        }
    }
    
    try{
        const orders = await prisma.order.findMany({
            take: take,
            skip: (page -1) * take,
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
       // console.log('ordersByUser', orders)

       const totalOrdersByUser = await prisma.order.count({
            where: {
                userId: session!.user.id,
            },
       });

       // obtail the number total of pages
       const totalPages = Math.ceil( totalOrdersByUser/ take);
        return {
            ok:true,
            orders: orders,
            currentPage: page,
            totalPages: totalPages,
            totalOrdersByUser: totalOrdersByUser,
        };


    }catch(error){
        console.log(error)
       //throw new Error(`There is no order by Id:${orderId}`)
       return {
            ok: false,
            message: `No orders- Error retrieving orders`

       }
    }

}