'use server'; 
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async(id: string) => {

    const session = await auth();

    if(!session?.user){
        return {
            ok:false,
            message:'User must be authenticated'
        }
    }
    
    try{
        const order = await prisma.order.findUnique({
            where: {id},
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,

                                ProductImage: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1,
                                }
                                
                    }
    
                        }
                    },
                   
                }
            }
        });

        if(!order) throw (`Order with id:${id} doesn't exist`);

        // if the order exists but does not belong to the logged-in user
        if(session.user.role === 'user'){
            if(session.user.id !== order.userId){
                throw `Order-Id: ${id}: not belong to the logged-in User `
            }
        }

        return {
            ok:true,
            order: order,
        }
       

    }catch(error){
        console.log(error)
       //throw new Error(`There is no order by Id:${orderId}`)
       return {
            ok: false,
            message: `Order doesn't exist`

       }
    }

}