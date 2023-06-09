// Imports
import React from 'react'
import { useDispatch } from 'react-redux';

import { changeSortType } from '../features/filter/filterSlice';
import { SortPropertyEnum, SortItem } from '../features/filter/types';
// -------------------------------------------------------------------------------------------
//! types

type SortPopupProps = {
  selectedSortType: SortItem;
};


// ---------------------------------------------------------------------------------------------
export const sortList: SortItem[] = [{
  name: 'popularity (DESC)',
  sortProperty: SortPropertyEnum.RATING_DESC
},
{
  name: 'popularity (ASC)',
  sortProperty: SortPropertyEnum.RATING_ASC
},
{
  name: 'price (DESC)',
  sortProperty: SortPropertyEnum.PRICE_DESC
},
{
  name: 'price (ASC)',
  sortProperty: SortPropertyEnum.PRICE_ASC

},
{
  name: 'alphabet (DESC)',
  sortProperty: SortPropertyEnum.TITLE_DESC
},
{
  name: 'alphabet (ASC)',
  sortProperty: SortPropertyEnum.TITLE_ASC
},
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ selectedSortType }) => {

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const chooseSortType = (typeObj: SortItem) => {
    dispatch(changeSortType(typeObj))
    setIsOpen(false)
  }

  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Element)) {
        setIsOpen(false)
      }
    }
    // Bind the event listener
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener 
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortRef]);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C" />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedSortType?.name}
        </span>
      </div>
      {
        isOpen && (
          <div className="sort__popup ">
            <ul>
              {
                sortList.map((typeObj, i) =>
                  <li
                    key={i}
                    onClick={() => chooseSortType(typeObj)}
                    className={selectedSortType.name == typeObj.name ? "active" : ""}
                  >
                    {typeObj.name}
                  </li>
                )
              }
            </ul>
          </div>
        )
      }

    </div>
  )
}, (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps));



// export default React.memo(SortPopup)
export default SortPopup