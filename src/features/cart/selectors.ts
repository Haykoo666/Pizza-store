import { RootState } from "../../app/store";
import { CartItem } from "./types";


export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj: CartItem) => obj.id == id);

export const selectCart = (state: RootState) => state.cart;