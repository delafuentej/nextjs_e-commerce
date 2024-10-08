"use client";

import type { Product, CategoryProduct, Category, ProductImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & { ProductImage?: ProductImage[]};
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
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];



export const ProductForm = ({ product, categories }: Props) => {
  console.log('product', product)

  const {handleSubmit, register, formState: {isValid}, getValues, setValue, watch} = useForm<FormInputs>({defaultValues:{
    ...product,
    tags: product.tags.join(', '),
    sizes:  product.sizes ?? [],

  }}); 
// for the ui to update changes => watch
  watch('sizes');

  const onSubmit = async(data: FormInputs) => {
    console.log({data});
  }

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));

   (sizes.has(size)) ? sizes.delete(size) : sizes.add(size);

   console.log(sizes)
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

      {/* Selector de tallas y fotos */}
      <div className="w-full">
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
              type="file"
              multiple 
              className="p-2 border rounded-md bg-purple-100" 
              accept="image/png, image/jpeg"

            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {
              product.ProductImage?.map( image => (
                <div
                key={image.id}
                >
                  <Image 
                  className="rounded-t-xl  w-full shadow-xl"
                  src={`/products/${image.url}`}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                  />

                  <button 
                    type='button'
                    className="bg-red-500  text-white font-bold p-2 rounded-b-xl  w-full animate-pulse shadow-xl"
                    onClick={()=>console.log(image.id, image.url)}
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