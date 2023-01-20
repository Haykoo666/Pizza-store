import { PizzaBlockProps } from "../../components/pizza/PizzaSkeleton";

export interface PizzasSliceState {
  items: PizzaBlockProps[];
  status: Status;
  // status: "PENDING" | "REJECTED" | "RESOLVED";
}
export type SearchPizzasParams = {

}

export enum Status {
  LOADING = "PENDING",
  SUCCESS = "RESOLVED",
  ERROR = "REJECTED",
}
