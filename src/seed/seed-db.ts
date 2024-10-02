import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
   //delete previous records : tables
  // await Promise.all([
     
     await prisma.productImage.deleteMany();
     await prisma.product.deleteMany();
     await prisma.category.deleteMany();
     await prisma.user.deleteMany();
  // ]);
   // categories
   const {categories, products, users } = initialData;

   await prisma.user.createMany({
      data: users
   });

   const categoriesData = categories.map((name) => ({name}))
//    const categoriesData = categories.map(category => ({
//         name: category
//    })
// )
   await prisma.category.createMany({
    data: categoriesData
   });
   
   // relation products-categories
   const categoriesDB = await prisma.category.findMany();

   const categoriesMap = categoriesDB.reduce((map, category)=> {
      map[category.name.toLocaleLowerCase()] = category.id;
      return map;
   }, {} as Record<string, string>) // <string ='shirt', string= categoryId=>

// products

   //const {images, type, ...product1} = products[0];

   products.forEach( async(product) => {
      const {type, images, ...rest} = product;

      const dbProduct = await prisma.product.create({
         data: {
            ...rest,
            categoryId: categoriesMap[type]
         }
      })

       // images: 
   const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
   }))
   await prisma.productImage.createMany({
      data: imagesData
   })
   })

   // await prisma.product.create({
   //    data:{
   //       ...product1,
   //       categoryId: categoriesMap['shirts']
   //    }
   // })
  // console.log('product1', product1)

 
   console.log('SEED Executed');
}

(()=> {
    if(process.env.NODE_ENV === 'production') return;

    main();

})()