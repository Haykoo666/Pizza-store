import { memo, FC, useState } from 'react'
// // import { useParams } from 'react-router';
import styles from './Pagination.module.scss'

type PaginationSkeletonProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: Function
}

const pageNumbers: number[] = [];

const PaginationSkeleton: FC<PaginationSkeletonProps> = ({ postsPerPage, totalPosts, paginate }) => {

  const [activeIndex, setActiveIndex] = useState(
    +window.location.search[window.location.search.length - 1] - 1 || 0
  );
  console.log("🚀 ~ file: PaginationSkeleton.tsx:16 ~ activeIndex", activeIndex)
  // console.log(window.location.search[window.location.search.length-1]);

  pageNumbers.length = 0;
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); ++i) {
    pageNumbers.push(i);
  }

  const changePage = (num: number): void => {
    paginate(num)
    setActiveIndex(num - 1)
  };

  // const left = () => {
  //   paginate(activeIndex == 0 ? 2 : activeIndex+1)
  //   setActiveIndex(activeIndex+1);
  // }

  return (
    <>
      <hr className={styles.paginationLine} />
      <div className={styles.pagination}>
        <button disabled={activeIndex == 0 ? true : false} className="pagination__btn__left" title='not working at the moment'> &laquo; </button>
        {
          pageNumbers.map((num: number, i: number) => (
            <button key={i} className={activeIndex == i ? styles.active : ""} onClick={() => changePage(num)}>
              {num}
            </button>
          ))
        }
        <button title='not working at the moment'> &raquo; </button>
      </div>
    </>
  )
}

export default memo(PaginationSkeleton, (prevProps, nextProps) => prevProps.totalPosts === nextProps.totalPosts)
// export default  PaginationSkeleton





