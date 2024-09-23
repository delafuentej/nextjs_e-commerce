import { QuantitySelector, SizeSelector, ProductSlideshow, ProductMobileSlideshow } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params: {
    slug: string;
  }
}


export default function Product({params}:Props) {

  const {slug} = params;

  const product = initialData.products.find( product => product.slug === slug);

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
          {/* product price */}
          <p className="text-lg mb-1.5">{product.price} €</p>

          {/* size selector */}
          <SizeSelector 
            availableSizes={product.sizes}
            selectedSize={product.sizes[2]}
          />

          {/* quantity selector */}
          <QuantitySelector
            quantity={1}
          />

          {/* button : add to cart */}
          <button className="btn bg-purple-500 font-bold text-white py-2 px-4 rounded
           my-5 hover:bg-purple-900">
            Add to Cart
          </button>

          {/* article description */}
          <h3 className="text-sm font-bold">Description</h3>
          <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}