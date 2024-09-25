import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
   //delete tables
   await Promise.all([
     prisma.productImage.deleteMany(),
     prisma.product.deleteMany(),
     prisma.category.deleteMany(),
 
   ]);
   console.log('SEED Executed');
}

(()=> {
    if(process.env.NODE_ENV === 'production') return;

    main();

})()