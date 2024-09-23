'use client';
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";


interface Props {
    quantity: number;
}

export const QuantitySelector = ({quantity}: Props) => {

        const[count, setCount] = useState(quantity);

        const onQuantityChanged = (val: number) => {
            if (count + val < 1) return;

            setCount( count + val);
        }

  return (
    <div className="flex"> 
        <button
            onClick={()=> onQuantityChanged(-1)}
        >
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className="flex justify-center items-center w-15 mx-3 px-5 bg-purple-100 text-center font-extrabold text-purple-900 rounded">
            {count}
        </span>

        <button
            onClick={ () => onQuantityChanged(+1)}
        >
            <IoAddCircleOutline size={30}/>
        </button>
    
    </div>
  )
}
