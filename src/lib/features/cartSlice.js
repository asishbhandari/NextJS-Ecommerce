import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    items: [],
};

export const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            const index= state.items.findIndex((item,i) => item.id === action.payload.id)
            if(index === -1){
                const startQuan=1
                const additem = action.payload;
                additem.quantity =startQuan;
                state.items.push(additem);
            }
            else{
                const newQuan =state.items[index].quantity +1
                state.items[index].quantity = newQuan;
            }
        },
        decrementItemQuantity: (state, action)=>{
            const index= state.items.findIndex((item,i) => item.id === action.payload.id);
            const newQuan =state.items[index].quantity -1
            state.items[index].quantity = newQuan;
        },
        removeFromCart: (state, action)=> {
            const index= state.items.findIndex((item,i) => item.id === action.payload.id);
            const remainingItems= [...state.items];
            remainingItems.splice(index,1)
            state.items= [...remainingItems];
        }
    }
})

export const {addToCart, removeFromCart, decrementItemQuantity} = cartSlice.actions;

export default cartSlice.reducer;