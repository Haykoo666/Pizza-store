import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

import FilterReducer from '../features/filter/filterSlice'
import CartReducer from '../features/cart/cartSlice'
import PizzasReducer from '../features/pizzas/pizzasSlice'

export const store = configureStore({
  reducer: {
    filter: FilterReducer,
    cart: CartReducer,
    pizzas: PizzasReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// Export a hook that can be reused to resolve types
