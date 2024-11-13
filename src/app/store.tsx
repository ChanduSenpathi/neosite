
import { configureStore, createSlice } from "@reduxjs/toolkit";


interface Product {
    id: number,
    title: string,
    price: number,
    thumbnail: string,
    quantity: number,
    amount : number
}

export type cartState = {
    cart: Product[],
    total: number
}

type actionType = {
    type: string,
    payload: Product
}

const initialState:cartState = {
    cart: [],
    total: 0
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: actionType) => {
            if(state.cart.length >0){
                state.total = 0;
                const existingItem = state.cart.find((item: Product) => item.id === action.payload.id)
                if(!existingItem){
                    state.cart.push(action.payload);
                    state.cart.forEach((items:Product)=>{
                        items.quantity = 1;
                        items.amount = items.price
                        state.total += items.amount;
                    })
                }
            }else {
                state.cart.push(action.payload);
                state.cart.forEach((items:Product)=>{
                    if(!items.quantity){
                        items.quantity = 1;
                        items.amount = items.price
                    }            
                    state.total += items.price;
                })
            }
          },
        increaseQuantity: (state, action: actionType)=>{
            const item = state.cart.find((item: Product) => item.id === action.payload.id);
            if(item){
                item.quantity += 1;   
                item.amount = item.quantity * item.price
                state.total += item.price;             
            }
        },
        decreaseQuantity: (state, action: actionType)=>{
            const item = state.cart.find((item: Product) => item.id === action.payload.id);
            if(item && item.quantity !==1){
                item.quantity -= 1;
                item.amount = item.quantity * item.price
                state.total -= item.price;
            }
        },
        deleteItem: (state, action: actionType) => {
            const filterData = state.cart.filter((item: Product)=> {
                if(item.id !== action.payload.id){
                    return item;
                }else {                    
                    state.total -=item.amount;
                }
            })
            if(filterData.length !== 0){
                state.cart = filterData;
            }else {
                state.total = 0;
                state.cart = [];
            }
        }
    }
})

const store  = configureStore({
    reducer : {
        cart: cartSlice.reducer,
    }
})

export default store;
export const {addItem, increaseQuantity,  decreaseQuantity, deleteItem} = cartSlice.actions;