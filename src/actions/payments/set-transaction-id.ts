'use server';

import prisma from "@/lib/prisma";


export const setTransactionId = async(orderId: string, transactionId: string) => {
    try{
        const order = await prisma.order.update({
            where: {id: orderId},
            data: {transactionId: transactionId}
        });
        console.log('order', order)

        if(!order){
            return {
                ok: false,
                message: `Order with id: ${orderId} couldn't be located`,
            }
        }

        return {
            ok: true
        }


    }catch(error){
        console.log(error)
        return{
            ok:false,
            message: `Transaction-Id couln't be updated`
        }
    }
}