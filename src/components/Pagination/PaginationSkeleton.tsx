import React, { memo } from 'react'
import { useParams } from 'react-router';
import styles from './Pagination.module.scss'

type PaginationSkeletonProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: Function
}

const pageNumbers:number[] = [];

const PaginationSkeleton:React.FC<PaginationSkeletonProps> = ( {postsPerPage, totalPosts, paginate} ) => {

  const [activeIndex, setActiveIndex] = React.useState(+window.location.search[window.location.search.length-1]-1 || 0);
  // console.log(window.location.search[window.location.search.length-1]);
    
  pageNumbers.length = 0;
  for (let i = 1; i <= Math.ceil( totalPosts / postsPerPage ); ++i) {
    pageNumbers.push(i);
  }

  const changePage = (num:number):void => {
    paginate(num)
    setActiveIndex(num-1)
  }

  return (
    <>
      <hr className={styles.paginationLine}/>
      <div className={styles.pagination}>
        <button> &laquo; </button>
        {
          pageNumbers.map( (num:any, i:number) => (
            <button key={ i } className={activeIndex == i ? styles.active : ""} onClick={ () => changePage(num) }>
              { num }
            </button>
          ))
        }
        <button> &raquo; </button>
      </div>
    </>
  )
}

export default memo(PaginationSkeleton, (prevProps, nextProps) => prevProps.totalPosts === nextProps.totalPosts )
// export default  PaginationSkeleton