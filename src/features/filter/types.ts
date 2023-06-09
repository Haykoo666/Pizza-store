export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export interface FilterSliceState {
  categoryId: number;
  searchValue?: string;
  selectedSortType: SortItem;
  currentPage: number
};

export type SearchPizzaParams = {
  selectedSortType: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

