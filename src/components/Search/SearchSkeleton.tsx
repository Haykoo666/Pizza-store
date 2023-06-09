import { useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss'
import { changeSearchValue } from '../../features/filter/filterSlice';


const Index: React.FC = () => {

  // const searchValue = useSelector((state:any) => state.filter.searchValue);
  const dispatch = useDispatch()
  const [val, setVal] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value)
    updateSearchValue(event.target.value)
  };


  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(changeSearchValue(str));
    }, 550),
    [],
  );

  const onClear = (event: React.MouseEvent) => {
    console.log("🚀 ~ file: SearchSkeleton.tsx:30 ~ onClear ~ event", event.clientY)

    setVal("");
    dispatch(changeSearchValue(""))
    // document.querySelector("input")?.focus()
    // bad solution
    inputRef.current?.focus()
  }

  return (
    <>
      <div className={styles.root}>
        <svg
          className={styles.icon}
          enableBackground="new 0 0 32 32"
          id="EditableLine"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="14"
            cy="14"
            fill="none"
            id="XMLID_42_"
            r="9"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="3"
          />
          <line
            fill="none"
            id="XMLID_44_"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="3"
            x1="27"
            x2="20.366"
            y1="27"
            y2="20.366"
          />
        </svg>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="Search pizzas..."
          value={val}
          onChange={onChangeInput}
        />
        {
          val && (
            <svg
              className={styles.clearIcon}
              onClick={onClear}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          )
        }
      </div>
    </>
  )
}

export default Index