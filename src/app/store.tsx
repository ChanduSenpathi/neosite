
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface cartType {
    id: number,
    name: string,
    price: number,
    thumbnail: string,
    quantity: number,
    amount : number
}

type cartState = {
    cart: any,
    total: number
}

const initialState:cartState = {
    cart: [],
    total: 0
}


type actions = {
    type: string,
    payload: any
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<any>) => {
            if(state.cart.length >0){
                state.total = 0;
                let existingItem = state.cart.find((item: cartType) => item.id === action.payload.id)
                if(!existingItem){
                    state.cart.push(action.payload);
                    state.cart.forEach((items:cartType)=>{
                        items.quantity = 1;
                        items.amount = items.price
                        state.total += items.amount;
                    })
                }
            }else {
                state.cart.push(action.payload);
                state.cart.forEach((items:cartType)=>{
                    if(!items.quantity){
                        items.quantity = 1;
                        items.amount = items.price
                    }            
                    state.total += items.price;
                })
            }
          },
        increaseQuantity: (state, action:PayloadAction<any>)=>{
            const item = state.cart.find((item: cartType) => item.id === action.payload.id);
            if(item){
                item.quantity += 1;   
                item.amount = item.quantity * item.price
                state.total += item.price;             
            }
        },
        decreaseQuantity: (state, action:PayloadAction<any>)=>{
            const item = state.cart.find((item: cartType) => item.id === action.payload.id);
            if(item && item.quantity !==1){
                item.quantity -= 1;
                item.amount = item.quantity * item.price
                state.total -= item.price;
            }
        },
        deleteItem: (state, action:PayloadAction<any>) => {
            let filterData = state.cart.filter((item: cartType)=> {
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