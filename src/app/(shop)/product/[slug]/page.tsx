export const revalidate = 604800;// seven days 60*60*24*7

import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/actions";
import { ProductSlideshow, ProductMobileSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";


//import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";




interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
 
  // fetch data
  const product = await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: (product?.title ?? 'Item not found'),
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Item not found',
      description: product?.description ?? '',
      //images: [], https://mywebsite.com/products/prod-1/image.png
      images: [`/products/${product?.images[1]}`],
    },
  }
}


export default async function Product({params}:Props) {

  const {slug} = params;

  //const product = initialData.products.find( product => product.slug === slug);

  const product = await getProductBySlug(slug);
  console.log('product',product)
  if(!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
     
       {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow */}
        <ProductMobileSlideshow 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* desktop slideshow */}
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* Product Details */}
      <div className="col-span-1 px-5"> 
          {/* puduct title */}
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}> {product.title}</h1>

        {/* stock label */}
        <StockLabel  slug={product.slug}/>

       

          {/* product price */}
          <p className="text-lg mb-1.5">{product.price} €</p>

        {/* Add to Cart */}
          <AddToCart 
            product={product}
          />
         
        

          {/* article description */}
          <h3 className="text-sm font-bold">Description</h3>
          <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}