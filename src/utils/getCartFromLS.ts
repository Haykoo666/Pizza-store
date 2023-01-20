// ==>  Imports
import { CartItem } from '../features/cart/types';
import { calcTotalPrice } from './calcTotalPrice';
// ----------------------------------------------------------------------


export const getCartFromLS = () => {
  const getData = localStorage.getItem('cart');
  const items = getData ? JSON.parse(getData) : [];
  const totalPrice = calcTotalPrice(items);
  
  return {
    items: items as CartItem[],
    totalPrice,
  }

};