import { create } from "zustand";
import type{ CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];

    //methods:
   addProductToCart : (product: CartProduct)=> void;
    // updateProductQuantity
    // removeProductFromChart

}

export const useCartStore =  create<State>()(
    // middelware (contra: hidratation problem) => to directly save the store in the localStorage
    // and retrieve the store from localStorage 
    //persist( definition store, name store)
    
   persist(
    (set, get) => ({

        cart: [],
        
        // methods:
        addProductToCart: (product: CartProduct) => {
            const {cart} = get();
            console.log('cart', cart);
    
            // check if the product exists in the cart with the selected size
            const productInCart = cart.some(
                (item) => (item.id === product.id && item.size === product.size),
            )
            if(! productInCart){
                set({cart: [...cart, product]});
                return;
            }
            //when checking that the product exists by size, increase it 
            const updatedCartProducts = cart.map( (item) => {
    
                if(item.id === product.id && item.size === product.size){
                    return {
                        ...item,
                        quantity: item.quantity + product.quantity
                    }
                }
                return item;
            });
    
            set({ cart: updatedCartProducts});
    
        }
    })

    , {
        name: 'shopping-cart'
    }
   )
)
