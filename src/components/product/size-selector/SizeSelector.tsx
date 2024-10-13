import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    availableSizes: Size[];
    selectedSize?: Size;

    onSizeSelected: (size: Size) => void;
   
}


export const SizeSelector = ({availableSizes, selectedSize, onSizeSelected}: Props) => {
  return (
    <div className="my-5 ">
        <h3 className="mb-4 font-bold">Available Sizes</h3>

        <div className="flex mr-1">
            {availableSizes.map( (size) => (
                <button
                    onClick={() => onSizeSelected(size)}
                    className={ 
                        clsx(
                            "mx-2 text-lg",
                            {
                                'btn btn-primary': size === selectedSize
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
