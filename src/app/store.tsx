
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Product } from "./products/page";
import { auth } from "./(auth)/login/page";




export type cartState = {
    cart: Product[],
    total: number,
    isUserLoggedIn: boolean,
    userName: string
}

interface actionObject {
    isTrue: boolean,
    user: string
}


type actionType = {
    type: string,
    payload: Product
}

type authType = {
    type: string,
    payload: actionObject
}

type cartType = {
    type: string,
    payload: Product []
}



const initialState: cartState = {
    userName: '',
    cart: [],
    total: 0,
    isUserLoggedIn: false
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: actionType) => {
            if (state.cart.length > 0) {
                const existingItem = state.cart.find((item: Product) => item.id === action.payload.id)
                if (!existingItem) {
                    state.cart.push(action.payload);
                    state.cart.forEach((items: Product) => {
                        if (!items.quantity) {
                            items.quantity = 1;
                            items.amount = items.price
                            items.isAdded = true;
                        }
                    })
                }
                state.total = 0;
                state.cart.forEach((item: Product) => {
                    state.total += item.amount
                })
            } else {
                state.cart.push(action.payload);
                state.cart.forEach((items: Product) => {
                    if (!items.quantity) {
                        items.quantity = 1;
                        items.amount = items.price
                        items.isAdded = true;
                    }
                    state.total += items.price;
                })
            }
            const storageItems: string | null = localStorage.getItem('userDetails');
            if(storageItems !== null){
                const arrayOfItem = JSON.parse(storageItems)
                const mappedData = arrayOfItem.map((items: auth)=>{
                    if(items.isLogged){
                        return {...items, cart: state.cart, total: state.total.toFixed(2)}
                    }
                    return items
                })
                localStorage.setItem('userDetails', JSON.stringify(mappedData))
            }
        },
        increaseQuantity: (state, action: actionType) => {
            const item = state.cart.find((item: Product) => item.id === action.payload.id);
            if (item) {
                if (item.quantity < item.minimumOrderQuantity) {
                    item.quantity += 1;
                    item.amount = item.quantity * item.price
                    state.total += item.price;
                    const storageItems: string | null = localStorage.getItem('userDetails');
                    if(storageItems !== null){
                        const arrayOfItem = JSON.parse(storageItems)
                        const mappedData = arrayOfItem.map((items: auth)=>{
                            if(items.isLogged){
                                return {...items, cart: state.cart, total: state.total.toFixed(2)}
                            }
                            return items;
                        })
                        localStorage.setItem('userDetails', JSON.stringify(mappedData));

                    }
                } else {
                    alert('You have reached the maximum quantity')
                }
            }
        },
        decreaseQuantity: (state, action: actionType) => {
            const item = state.cart.find((item: Product) => item.id === action.payload.id);
            if (item && item.quantity !== 1) {
                item.quantity -= 1;
                item.amount = item.quantity * item.price
                state.total -= item.price;
                const storageItems: string | null = localStorage.getItem('userDetails');
                if(storageItems !== null){
                    const arrayOfItem = JSON.parse(storageItems)
                    const mappedData = arrayOfItem.map((items: auth)=>{
                        if(items.isLogged){
                            return {...items, cart: state.cart, total: state.total.toFixed(2)}
                        }
                        return items;
                    })
                    localStorage.setItem('userDetails', JSON.stringify(mappedData));

                }
            }
        },
        deleteItem: (state, action: actionType) => {
            const filterData = state.cart.filter((item: Product) => {
                if (item.id !== action.payload.id) {
                    return item;
                } else {
                    state.total -= item.amount;
                    item.isAdded = false;
                }
            })
            if (filterData.length !== 0) {
                state.cart = filterData;
            } else {
                state.total = 0;
                state.cart = [];
            }            
            const storageItems: string | null = localStorage.getItem('userDetails');
                if(storageItems !== null){
                    const arrayOfItem = JSON.parse(storageItems)
                    const mappedData = arrayOfItem.map((items: auth)=>{
                        if(items.isLogged){
                            return {...items, cart: filterData, total: state.total.toFixed(2)}
                        }
                        return items;
                    })
                    localStorage.setItem('userDetails', JSON.stringify(mappedData));

                }
        },
        setAuth: (state, action: authType) => {
            state.isUserLoggedIn = action.payload.isTrue;
            state.userName = action.payload.user;
        },
        addCart: (state, action: cartType) =>{
            state.cart = action.payload;
            action.payload.forEach((items:Product) =>{
                items.amount = items.price * items.quantity;
                state.total += items.amount;
            })
        },
        resetState: () => initialState
    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    }
})

export default store;
export const { addItem, increaseQuantity, decreaseQuantity, deleteItem, setAuth, resetState, addCart } = cartSlice.actions;