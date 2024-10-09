
import { Title } from "@/components";
import { ProductForm } from "./ui/ProductForm";
import { getProductBySlug } from '../../../../../actions/product/get-product-by-slug';
import { redirect } from "next/navigation";
import { getCategories } from "@/actions";
interface Props {
    params: {
        slug: string;
    }
}


export default async function Product({params}: Props) {

    const { slug } = params;

    const [product, categories] = await Promise.all([
      getProductBySlug(slug),
      getCategories(),
    ]);

    
    if(!product && slug !== 'new'){
      redirect('/admin/products');
    }

    const title = (slug === 'new') ? 'New Product' : 'Edit Product'

  return (
    <>
     <Title title={title}/>
     <ProductForm 
      product ={product ?? {}}
      categories = {categories}
      />
    </>
  );
}