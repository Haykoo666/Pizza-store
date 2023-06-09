import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PizzaBlockProps } from '../../components/pizza/PizzaSkeleton';
import { fetchPizzas } from './asyncActions';
import { PizzasSliceState, Status } from './types';


const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING
}


export const PizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      console.log("pending");

      state.status = Status.LOADING
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaBlockProps[]>) => {
      console.log("success");

      state.items = action.payload;
      // state.status = Status.SUCCESS;
      state.status = !action.payload.length ? Status.ERROR : Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
})

// Action creators are generated for each case reducer function
// export const { setItems } = PizzasSlice.actions;


export default PizzasSlice.reducer