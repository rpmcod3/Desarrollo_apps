import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        user: "test",
        updatedAt: new Date().toLocaleString(),
        cartItems: [],
        total: 0
    },
    reducers: {
        addItemTocart: (state, action) => {
            const {product, quantity} = action.payload
            console.log("Añadiendo producto al carrito: ", product,quantity)
            const productInCart = state.cartItems.find(item=>item.id===product.id)
            if(!productInCart){
                state.cartItems.push({...product,quantity})
            }else{
                productInCart.quantity+=1
            }
            state.updatedAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc,item)=> acc + item.price*item.quantity, 0)
            state.updatedAt = new Date ().toLocaleString();
        },
        removeItems : (state, action) => { 
            state.cartItems= state.cartItems.filter(item=>item.id!==action.payload)
            state.total= state.cartItems.reduce((acc, item)=> acc + (item.price* item.quantity), 0);
            state.updatedAt = new Date ().toLocaleString();
             },
             
        clearCart : (state, action) => {
            state.cartItems = []
            state.updatedAt = new Date().toLocaleString();
            state.total=0
        },
    }
})

export const { addItemTocart } = cartSlice.actions

export default cartSlice.reducer