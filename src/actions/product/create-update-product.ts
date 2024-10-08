'use server';

import { Gender } from '@prisma/client';
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
    sizes: z.coerce.string().transform( val => val.split(', ')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),

})



export const createUpdateProduct = async(formData: FormData) => {

   // console.log(formData);
   const data = Object.fromEntries(formData);

   const parsedProduct = productShema.safeParse(data);

   
   if(!parsedProduct.success){
    console.log(parsedProduct.error);
    return {ok:false};
   }
   console.log(parsedProduct.success)

    return {
        ok: true,
    }
}