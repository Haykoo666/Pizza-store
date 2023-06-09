import { useRef, useState, useEffect, useCallback } from "react"
import { useSelector } from 'react-redux'
import qs from 'qs';
import { useNavigate } from 'react-router';


import Categories from '../components/Categories';
import PizzaSkeleton from '../components/pizza/PizzaSkeleton';
import Sort from '../components/SortPopup';
import PizzaSkeletonLoader from './../components/pizza/PizzaSkeletonLoader';
import PaginationSkeleton from './../components/Pagination/PaginationSkeleton';
import { changeCategoryId, setURL } from '../features/filter/filterSlice';
import { sortList } from '../components/SortPopup';
import { fetchPizzas } from '../features/pizzas/asyncActions';
import { selectPizzas } from './../features/pizzas/selectors';
import { useAppDispatch } from '../app/store';
import { selectFilter } from '../features/filter/selectors';

// --------------------


const Home: React.FC = () => {
  //! Redux
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { items: pizzas, status } = useSelector(selectPizzas)
  const { categoryId, selectedSortType, searchValue, currentPage: pageNum } = useSelector(selectFilter);
  // -----------------------------------------------------------------------------------------  
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  // -----------------------------------------------------------------------------------------
  //! Pagination
  const [currentPage, setCurrentPage] = useState<number>(pageNum);
  const [postsPerPage] = useState<number>(4);
  const topRef = useRef<HTMLHeadingElement | null>(null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPizzas = pizzas.slice(indexOfFirstPost, indexOfLastPost);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const paginate = (page: number): void => {
    setCurrentPage(page)
    scrollToTop()

  }
  // -----------------------------------------------------------------------------------------

  const onCategoryHandler = useCallback((index: number) => {
    dispatch(changeCategoryId(index))
  }, [])


  async function getPizzas() {

    const orderType: string = selectedSortType.sortProperty.includes("-") ? "asc" : "desc"
    const category: string = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType: string = selectedSortType.sortProperty.replace("-", "");
    const search: string = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({
      orderType,
      category,
      sortType,
      search
    }))
  }

  useEffect(() => {

    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1))
      // console.log("🚀 ~ file: Home.tsx:70 ~ React.useEffect ~ params", params)
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setURL({
        categoryId: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        selectedSortType: sort ? sort : sortList[0]
      }))
      isSearch.current = true
    }

  }, [])

  useEffect(() => {
    console.log("outside if");
    if (isMounted.current) {
      console.log("inside if");

      const queryString = qs.stringify({
        sortProperty: selectedSortType.sortProperty,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, selectedSortType, currentPage])


  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false;

    window.scrollTo(0, 0)

  }, [categoryId, selectedSortType, searchValue])

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onCategoryHandler={onCategoryHandler} />
        <Sort selectedSortType={selectedSortType} />
      </div>

      <h2 className="content__title" ref={topRef}>All pizza</h2>
      {status === 'REJECTED' ? (
        <div className="content__error-info">
          <h1>Something went wrong 😕</h1>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {
            status == "PENDING" ?
              [...Array(9)].map((_, i) => <PizzaSkeletonLoader key={i} />) :
              currentPizzas
                .map((pizza: any) =>
                  <PizzaSkeleton
                    key={pizza.id}
                    {...pizza}
                  // title={ pizza.title } 
                  // price={ pizza.price } 
                  // imgURL={ pizza.imageUrl } 
                  // sizes={ pizza.sizes }
                  // types={ pizza.types }
                  />
                )
          }
        </div>
      )}
      <PaginationSkeleton
        postsPerPage={postsPerPage}
        totalPosts={pizzas.length}
        paginate={paginate}
      />
    </>
  )
}

export default Home