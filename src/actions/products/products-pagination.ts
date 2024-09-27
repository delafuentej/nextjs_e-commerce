'use server'

import prisma from "@/lib/prisma"



export const getPaginatedProductsWithImages = async () => {
    try {
        const products = await prisma.product.findMany({
            take:20,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        })
            
        console.log('products', products)
        return {
            products: products.map( product => ({
                        ...product,
                        images: product.ProductImage.map( image => image.url)
                    }))
        }
    } catch(error){
        throw new Error(`Products could not be loaded: ${error}`)
    }
}