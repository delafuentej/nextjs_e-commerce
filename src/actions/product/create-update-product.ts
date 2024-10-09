'use server';



//import { Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Gender, Product, Size} from '@prisma/client';

import {z} from 'zod';




//validation sheme
const productShema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
            .number()
            .min(0)
            .transform( val => Number(val.toFixed(2))),
    inStock: z.coerce
            .number()
            .min(0)
            .transform( val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform( val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),

})



export const createUpdateProduct = async(formData: FormData) => {

   // console.log(formData);
   const data = Object.fromEntries(formData);

   const parsedProduct = productShema.safeParse(data);

   
   if(!parsedProduct.success){
    //console.log(parsedProduct.error);
    return {ok:false};
   }
   //console.log(parsedProduct.success)
   const product = parsedProduct.data;

   //so that there are no leading or trailing blanks, lowerCase,  in slug
   product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

   const{id,...rest} = product;

   const prismaTx = await prisma.$transaction( async(tx) => {

        let product: Product;
        const tagsArray = rest.tags.split(',').map( tag => tag.toLowerCase())
       // console.log('sizes', product!.sizes)
        //update product if exists id
        if(id){
            product = await prisma.product.update({
                where: {id},
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[],
                    },
                    tags: {
                        set: tagsArray,
                    }
                }
            });
            console.log('updatedProduct',{updatedProduct: product})


        }else{
           //create new product if no id exists 
        }

        return {

        }
   });



    return {
        ok: true,
    }
}