'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async(imageId: number, imageUrl: string) => {

    if(!imageUrl.startsWith('http')){
        return {
            ok:false,
            error: 'Cannot delete pictures from filesystem'
        }
    }

    const imageName = imageUrl.split('/').at(-1)?.split('.')[0] ?? '';
   // console.log('imageNamre',imageName)

   try{
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
        where: {
            id: imageId,
            
        },
        // to take the 'slug' from deletedImage:(revalidate)
        select: {
            product: {
                select: {
                    slug: true,
                }
            }
        }

    })
    
    // revalidate paths
   revalidatePath('/admin/products');
   revalidatePath(`/admin/product/${deletedImage.product.slug}`);
   revalidatePath(`/product/${deletedImage.product.slug}`);


   }catch(error){
    console.log(error);
    return{
        ok:false,
        message: `Image couldn't be deleted`
    }
   }
}