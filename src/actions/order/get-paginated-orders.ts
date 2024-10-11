'use server'; 
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";



interface PaginationOptions {
    page?: number;
    take?: number;
};

export const getPaginatedOrders = async({
    page = 1,
    take =10,
}: PaginationOptions) => {

    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;


    const session = await auth();

    if(session?.user.role !== 'admin'){
        return {
            ok:false,
            message:'User must be authenticated'
        }
    }
    
    try{
        const orders = await prisma.order.findMany({
            take: take,
            skip: (page -1) * take,
           orderBy: {
            createdAt: 'desc'
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

        // obtain the total number of orders
        const totalOrders = await prisma.order.count();

        // obtain the number total of pages
        const totalPages = Math.ceil( totalOrders / take);

        return {
            ok:true,
            orders: orders,
            currentPage: page,
            totalPages: totalPages,
            totalOrders: totalOrders,
        };


    }catch(error){
        console.log(error)
       //throw new Error(`There is no order by Id:${orderId}`)
       return {
            ok: false,
            message: `No orders found`

       }
    }

}