'use server';



//import { Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Gender, Product, Size} from '@prisma/client';
import { revalidatePath } from 'next/cache';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
console.log('CLOUDINARY_URL',process.env.CLOUDINARY_URL)

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

   try{
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
            //console.log('updatedProduct',{updatedProduct: product})


        }else{
           //create new product if no id exists 
           product = await prisma.product.create({
            data: {
                ...rest,
                sizes: {
                    set: rest.sizes as Size[],
                },
                tags: {
                    set: tagsArray,
                }

            }
           })
        }
       // console.log('product',{ product})

       // images loading/saving process
       if( formData.getAll('images')){
        // [htts://url.jpg, htts://url.jpg]
        const images = await uploadImages(formData.getAll('images') as File[]);
        //console.log('images',images)
        if(!images){
            throw new Error('Failed to load images => roleback')
        }
        // if images => update them
        await prisma.productImage.createMany({
            data: images.map( image => ({
                url: image!,
                productId: product.id,
            }))
        })

       }

        return {
            product
        }
   });

   // revalidate paths
   revalidatePath('/admin/products');
   revalidatePath(`/admin/products/${product.slug}`);
   revalidatePath(`/admin/product/${product.slug}`);
   return {
    ok: true,
    product: prismaTx.product,
   }

   }catch(error){
    console.log(error)
        return {
            ok:false,
            message: "Product couldn't be updated/created"
        }
   }
};

const uploadImages = async(images: File[]) => {

    try{
        const uploadPromises = images.map(async(image: File)=> {

            try{
                 // as image has no path, but the name's file
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
    
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                        .then( resp => resp.secure_url)
    
            }catch(error){
                console.log(error);
                return null;
            }
        })

        const uploadedImages = await Promise.all(uploadPromises);

        return uploadedImages;
           
    }catch(error){
        console.log(error);
        return null;

    }
}