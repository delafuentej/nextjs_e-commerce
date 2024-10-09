"use client";

import type { Product, ProductImage as ProductWithImage, CategoryProduct, Category, Size } from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[]};
  categories: CategoryProduct[];
};

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Category;
  categoryId: string;

  //images
  images?: FileList;
}

const sizes : Size[]= ["XS", "S", "M", "L", "XL", "XXL"];



export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter();
 // console.log('product', product)

  const {handleSubmit, register, formState: {isValid}, getValues, setValue, watch} = useForm<FormInputs>({defaultValues:{
    ...product,
    tags: product.tags?.join(', '),
    sizes:  product.sizes ?? [],
    images: undefined,

  }}); 
// for the ui to update changes => watch
  watch('sizes');

  const onSubmit = async(data: FormInputs) => {
    //new FormData() => to create the object which is then sent to the server.
    const formData = new FormData();

    const {images,...productToSave} = data;

    if (product.id){
      formData.append('id', product.id ?? '');
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    //console.log('images', images)
    if(images){
      for(let i= 0; i< images.length; i++){
        formData.append('images', images[i]);
      }
    }
    
   const {ok, product: updatedProduct} =  await createUpdateProduct(formData);

   if(!ok){
    alert("Product couldn't be updated")
    return;
   }
    router.replace(`/admin/product/${updatedProduct?.slug}`)
  }

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));

   (sizes.has(size)) ? sizes.delete(size) : sizes.add(size);

   console.log('sizes',sizes)
    setValue('sizes', Array.from(sizes));
  }


  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input 
            type="text" 
            //value='ppp' 
            className="p-2 border rounded-md bg-purple-100" 
            {...register('title', {required:true})}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input 
            type="text" 
            className="p-2 border rounded-md bg-purple-100" 
            {...register('slug', {required:true})}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-purple-100"
            //value='fff'
            {...register('description', {required:true})}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input 
            type="number" 
            className="p-2 border rounded-md bg-purple-100" 
            {...register('price', {required:true, min:0})}
            />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input 
            type="text" 
            className="p-2 border rounded-md bg-purple-100" 
            {...register('tags', {required:true})}
            />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select 
            className="p-2 border rounded-md bg-purple-100"
            {...register('gender', {required:true})}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select 
            className="p-2 border rounded-md bg-purple-100"
            {...register('categoryId', {required:true})}
          >
            <option value="">[Select]</option>
            { categories.map( category => (
               <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

      

        <button className="bg-purple-500 hover:bg-purple-300 text-white w-full font-bold rounded-md p-2">
          Save
        </button>
      </div>


      {/* size selector photos and stock */}
      <div className="w-full">

        {/* stock */}
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input 
            type="number" 
            className="p-2 border rounded-md bg-purple-100" 
            {...register('inStock', {required:true, min:0})}
            />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Sizes</span>
          <div className="flex flex-wrap">
            
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div 
                  key={ size } 
                  onClick={()=>onSizeChanged(size)}
                  className={
                    clsx(
                      'p-3  cursor-pointer flex justify-center items-center w-10 h-10 mr-2 border rounded-md font-bold transition-all',
                      {
                        'bg-purple-500 text-white': getValues('sizes').includes(size),
                      }
                    )
                  }
                >
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Pictures</span>
            <input
              {...register('images')} 
              type="file"
              multiple 
              className="p-2 border rounded-md bg-purple-100" 
              accept="image/png, image/jpeg, image/avif"

            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {
              product.ProductImage?.map( image => (
                <div
                key={image.id}
                >
                  <ProductImage 
                  className="rounded-t-xl  w-full shadow-xl"
                  src={image.url}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                  />

                  <button 
                    type='button'
                    className="bg-black  text-white font-bold p-2 rounded-b-xl  w-full animate-pulse shadow-xl"
                    onClick={()=>deleteProductImage(image.id, image.url)}
                    >
                    Delete
                  </button>

                </div>
              ))
            }

          </div>

        </div>
      </div>
    </form>
  );
};