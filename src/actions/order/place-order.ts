'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { SidebarItem } from '../../components/ui/sidebar/SidebarItem';

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address) => {

   
    // to obtain userId from server side
    const session = await auth();

    const userId = session?.user.id;

    // to verify user's session
    if(!userId){
        return {
            ok: false,
            message: "500 - No user's session"
        }
    }
    
    console.log({productIds, address, userId})
   //to obtain info products 
     const products = await prisma.product.findMany({
        where: {
             id: {
                 in: productIds.map( item => item.productId)
            }
        }
    });
   // console.log('products',products)

   // calculate the amount
   const totalItems = productIds.reduce( (count, item) => count + item.quantity,0);

   //console.log({totalItems})

   // subtotal, total, taxes
   const {subTotal, taxes, total} = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;

        const product = products.find(product => product.id === item.productId);
 
        if(!product) throw new Error(`${item.productId} doesn't exists`)

         //totals
        const subTotal = product.price * productQuantity; 

         totals.subTotal += subTotal;
        totals.taxes += subTotal * 0.15;
         totals.total += subTotal * 1.15;

         return totals;
        
    }, {subTotal: 0, taxes: 0, total:0})

 //  console.log({subTotal, taxes, total})

 // create the  prisma database transaction : Order, OrderAddress, OrderItem
 try{
    const prismaTx = await prisma.$transaction( async(tx) => {

        // update stock products
        const updatedProductsPromises = products.map( (product)=> {

            // to accumulate the values 
            const productQuantity = productIds.filter(
                item => item.productId === product.id
            ).reduce((acc, it )=> it.quantity + acc ,0);

            if (productQuantity === 0) {
                //this error should not happen
                throw new Error(`${product.id} has no defined quantity`)
            };
            return tx.product.update({
                where: {
                    id: product.id
                },
                data: {
                   // inStock: product.inStock - productQuantity // incorrect update: not to do in case there are more customers trying to buy the same products at the same time.
                    inStock : {
                        decrement: productQuantity,
                    }
                }
            });
        });

        const updatedProducts = await Promise.all(updatedProductsPromises);
        // check the updatedProducts array for any order-product that is out of stock.
        updatedProducts.forEach( item => {
            if(item.inStock < 0){
                throw new Error(`${item.title} does not have sufficient stock`)
            }
        })

        // create order - Header - Details
         const order = await tx.order.create({
            data: {
                userId: userId,
                totalItems: totalItems,
                subTotal: subTotal,
                taxes: taxes,
                total: total,
                

                OrderItem:{
                    createMany: {
                        data: productIds.map( (item)=> ({
                            quantity: item.quantity,
                            size: item.size,
                            productId: item.productId,
                            price: products.find( product => product.id === item.productId)?.price ?? 0,
                        }))
                    }
                }
            }
        }); 
        // validate, if price  = 0, throw error

        // create address order
         const {country, _userId,...restAddress} = address;
         
           console.log('address',{address})
        const orderAddress = await tx.orderAddress.create({
           data: {
               ...restAddress,
                 countryId: country,
                 orderId: order.id,
               
            }
        })
//         console.log({orderAddress})
        return {
            updatedProducts: updatedProducts,
            order: order,
            orderAddress: orderAddress,
           
           
        }
   });

   return {
    ok: true,
    order: prismaTx.order,
    prismaTx: prismaTx,up
   }

 }catch (error: any){
    return {
        ok: false,
        message: error?.message,
    }
 }
   
   

}

