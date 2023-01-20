import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from './../../utils/getCartFromLS';
import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { CartItem, CartSliceState } from './types';



const { items, totalPrice } = getCartFromLS();

const initialState:CartSliceState = {
  totalPrice,
  items
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj:CartItem) => obj.id === action.payload.id);
      //! todo move to ==> utils
      findItem ? findItem.count ++ : state.items.push({...action.payload, count: 1});
      state.totalPrice = state.items.reduce((sum:number, obj:any) => sum+= obj.price * obj.count, 0);

    },
    removePizza: (state, action: PayloadAction<string>) => {
      if(window.confirm("Are you sure ?")){
        state.items = state.items.filter((obj:CartItem) => obj.id !== action.payload);
        state.totalPrice = calcTotalPrice(items)
        let cartFromLS = JSON.parse(localStorage.getItem('cart') || "");
        cartFromLS = cartFromLS.filter((obj:CartItem) => obj.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(cartFromLS))
      }
    },
    clearCartPizzas: (state) => {
      if (window.confirm("Clear all pizzas ?")) {
        state.items = [];
        state.totalPrice = 0;
        localStorage.clear()
      }
    },
    incrementPizzaCount: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj:any) => obj.id === action.payload);

      if(findItem) findItem.count++;
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrementPizzaCount: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj:any) => obj.id === action.payload);

      if(findItem) findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);

    },
  }
})

// Action creators are generated for each case reducer function

export const { addPizza, removePizza, clearCartPizzas, incrementPizzaCount, decrementPizzaCount } = cartSlice.actions

export default cartSlice.reducer