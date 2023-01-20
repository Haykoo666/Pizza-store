export type CartItem = {
  id: string;
  title: string;
  price: number;
  imgURL: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}
