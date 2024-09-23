import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    availableSizes: Size[];
    selectedSize: Size;
   
}


export const SizeSelector = ({availableSizes, selectedSize}: Props) => {
  return (
    <div className="my-5 ">
        <h3 className="mb-4 font-bold">Available Sizes</h3>

        <div className="flex mr-1">
            {availableSizes.map( (size) => (
                <button
                    className={ 
                        clsx(
                            "mx-2 text-lg",
                            {
                                'bg-purple-500 p-2 rounded-lg font-bold text-white': size === selectedSize
                            }
                        )
                        }
                    key={size}
                >
                    {size}
                </button>
            ))}
        </div>

    </div>
  )
}
