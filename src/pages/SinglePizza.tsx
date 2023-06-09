import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// -----------------------------------------------------------------

const SinglePizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imgURL: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63b16d44f9a53fa20277852c.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error when getting pizza!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <section className="container">
      <article className='singlePizzaBlock'>
        <img src={pizza.imgURL} alt="pizza photo" width={300} height={300} />
        <hr className='singlePizzaLine' />
        <h2> {pizza.title} </h2>
        <h4> {pizza.price} ֏ </h4>
        <hr style={{ width: 200 }} />
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Back</span>
          </button>
        </Link>
      </article>
    </section>
  );
};

export default SinglePizza;