import { useWhyDidYouUpdate } from 'ahooks';
import React from 'react'

type CategoriesProps = {
  categoryId: number;
  onCategoryHandler: (i: number) => void;
};


const categories: string[] = [
  "All",
  "Meaty",
  "Vegetarian",
  "Cheesy",
  "Spicy",
]


const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onCategoryHandler }) => {

  return (
    <div className="categories">
      <ul >
        {
          categories.map((category, i) =>
            <li onClick={() => onCategoryHandler(i)} className={categoryId == i ? "active" : ""} key={i}>
              {category}
            </li>
          )
        }
      </ul>
    </div>
  )
})

export default Categories;

// export default React.memo(Categories
//     // console.log(`
//     // `);
//     // console.log(prevProps);
//     // console.log(nextProps);
//     // console.log( JSON.stringify(prevProps) === JSON.stringify(nextProps) )
//     // console.log( prevProps === nextProps )
//     // return JSON.stringify(prevProps) === JSON.stringify(nextProps)
//     //  // return prevProps === nextProps
//   // }
// );