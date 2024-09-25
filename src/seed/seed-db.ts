import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
   //delete previous records : tables
   await Promise.all([
     prisma.productImage.deleteMany(),
     prisma.product.deleteMany(),
     prisma.category.deleteMany(),
 
   ]);
   // categories
   const {categories } = initialData;
   const categoriesData = categories.map((name) => ({name}))
//    const categoriesData = categories.map(category => ({
//         name: category
//    })
// )
   await prisma.category.createMany({
    data: categoriesData
   });
   console.log('categoriesData', categoriesData)

   console.log('SEED Executed');
}

(()=> {
    if(process.env.NODE_ENV === 'production') return;

    main();

})()