export type TLayoutMode = 'grid' | 'table';

/* PRODUCTS */
export interface IProduct {
  // _id: string,
  name: string,
  price: number,
  img: string,
  alt: string,
  disabled: boolean,
  external: boolean
}

export interface IProductResponse {
  msg: string,
  oldProduct: IProduct,
  newProduct: IProduct
}

export interface IOrder {
  name: string,
  price: number,
  weight: number
}

/* CASH REGISTER */
export interface IHarvest {
  products: IProduct[],
  totKg: number,
  totCash: number
}

export interface ISales {
  orders: IOrder[],
  totKg: number,
  totCash: number
}

export interface IDay {
  date: string,             // unique ID !!!
  weekOfTheYear: number,
  harvest: IHarvest,
  sales: ISales,
  // totDayKg: number,
  // totDayCash: number
}
