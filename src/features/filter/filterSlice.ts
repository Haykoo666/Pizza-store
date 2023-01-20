import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { FilterSliceState, SortItem, SortPropertyEnum } from './types';


const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  selectedSortType: {
    name: 'популярности (DESC)', 
    sortProperty: SortPropertyEnum.RATING_DESC
  },
  currentPage: 1
}

export const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    changeSortType: (state, action: PayloadAction<SortItem>) => {
      state.selectedSortType = action.payload
    },
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setURL: (state, action: PayloadAction<FilterSliceState>) => {
      // console.log("redux page ===>", action.payload);

      if (Object.keys(action.payload).length) {

        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.selectedSortType = action.payload.selectedSortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.selectedSortType = {
          name: 'popularity',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeCategoryId, changeSortType, changeSearchValue, setURL } = FilterSlice.actions


export default FilterSlice.reducer