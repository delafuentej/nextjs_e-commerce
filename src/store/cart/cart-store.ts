import { create } from "zustand";
import type{ CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];



    //methods:

    getTotalItems: () => number;
    getSummaryInfo: () => {
        subTotal: number;
        taxes:number;
        total: number;
        totalItems: number;
    };

    addProductToCart: (product: CartProduct)=> void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;

}

export const useCartStore =  create<State>()(
    // middelware (contra: hidratation problem) => to directly save the store in the localStorage
    // and retrieve the store from localStorage 
    //persist( definition store, name store)
    
   persist(
    (set, get) => ({

        cart: [],
        
        // methods:
        getTotalItems: () => {
            const {cart} = get();
            return cart.reduce((total, item)=> total + item.quantity,0)
        },

        getSummaryInfo: () => {
            const {cart} = get();

            const subTotal = cart.reduce((subTotal, item)=> subTotal + (item.price * item.quantity), 0);

            const taxes =(subTotal * 0.15 );

            const total = subTotal + taxes;

            const totalItems =  cart.reduce((total, item)=> total + item.quantity,0);

            return {
                 subTotal,
                 taxes,
                 total,
                totalItems,
            };
        },
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
    
        },

        updateProductQuantity: (product: CartProduct, quantity: number) =>{
            //console.log({product, quantity})
            const {cart} = get();

            const updatedCartProducts = cart.map( item =>{
                if(item.id === product.id && item.size === product.size){
                    return {...item, quantity: quantity}
                }
                return item;
            });
            set({ cart: updatedCartProducts});
        },

        removeProductFromCart: (product: CartProduct) => {
            const {cart} = get();

            const updatedCartProducts = cart.filter((item )=> item.id !== product.id || item.size !== product.size);
            
            set({ cart: updatedCartProducts});

        },

       

    })

    , {
        name: 'shopping-cart',
        //skipHydration: true,
    }
   )
)
