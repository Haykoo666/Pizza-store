import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss'
import cartEmptyImg from '../../assets/img/empty-cart.png';


export const CartEmpty: React.FC = () => (
  <div className={`${styles["cart--empty"]} cart`}>
    <h2>
      The cart is empty <span>😕</span>
    </h2>
    <p>
      Most likely, you haven't ordered pizza yet.
      <br />
      To order pizza, go to the main page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className={`${styles["button--black"]} button`}>
      <span>Go back</span>
    </Link>
  </div>
);
