import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

import pizzaLogo from '../assets/img/pizza-logo.svg'
import cart from '../assets/img/cart.svg'
import SearchSkeleton from './Search/SearchSkeleton'
import { selectCart } from '../features/cart/selectors';



const Header: React.FC = () => {

  const { pathname } = useLocation();
  const { totalPrice, items } = useSelector(selectCart);
  const totalItemsCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  useEffect(() => {
    items.length > 0 && localStorage.setItem("cart", JSON.stringify(items));
  }, [items])

  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img width="38" src={pizzaLogo} alt="Pizza logo" />
          </Link>
          <div>
            <Link to="/">
              <span>Tashir Pizza</span>
            </Link>
            <p>the most delicious pizza in the universe</p>
          </div>
        </div>
        <SearchSkeleton />
        {
          pathname == "/cart" ?
            null :
            <Link to="/cart">
              <div className="header__cart">
                <button className="button button--cart">
                  <span>{totalPrice} ֏</span>
                  <div className="button__delimiter"></div>
                  <img src={cart} alt="cart logo" className='cart-logo' />

                  <span> {totalItemsCount || 0} </span>
                </button>
              </div>
            </Link>
        }
      </div>
    </header>
  )
}

export default Header