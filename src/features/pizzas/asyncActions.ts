import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { PizzaBlockProps } from "../../components/pizza/PizzaSkeleton";


// Record<string, string> equal is ===>
// type FetchPizzas = {
//   sortType: string;
//   orderType: string;
//   category: string;
//   search: string;
// }


export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: Record<string, string>) => {
    const { sortType, orderType, category, search } = params;
    const { data } = await
      axios.get<PizzaBlockProps[]>(`https://63b16d44f9a53fa20277852c.mockapi.io/items?${category}&sortBy=${sortType}&order=${orderType}${search}`)
    return data as PizzaBlockProps[];
  }
)
