'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";


interface Props {
    quantity: number;

    onQuantitySelected: (val: number) => void;
}
export const QuantitySelector = ({quantity, onQuantitySelected}: Props) => {

        //const[count, setCount] = useState<number>(quantity);

        const onQuantityChanged = (val: number) => {
            if (quantity + val < 1) return;

            onQuantitySelected( quantity + val);
        }

  return (
    <div className="flex"> 
        <button
            onClick={()=> onQuantityChanged(-1)}
        >
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className="flex justify-center items-center w-15 mx-3 px-5 bg-purple-100 text-center font-bold text-purple-700 rounded">
            {quantity}
        </span>

        <button
            onClick={ () => onQuantityChanged(+1)}
        >
            <IoAddCircleOutline size={30}/>
        </button>
    
    </div>
  )
}
