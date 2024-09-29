import { create } from "zustand";
import type{ CartProduct } from "@/interfaces";


interface State {
    cart: CartProduct[];

    //methods:
   // addProductToCart = ()=> void;
    // updateProductQuantity
    // removeProductFromChart

}

export const useCartStore =  create<State>()(
    
    (set) => ({

    cart: []
}))
