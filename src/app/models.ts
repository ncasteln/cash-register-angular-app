export type TLayoutMode = 'grid' | 'table';

/* PRODUCTS */
export class Product implements IProduct {
  _id = '';
  name = '';
  price = -1;
  img = '';//new Image();
  disabled = false;
  external = false;
}

export class Image implements IImage {
  lastModified = '';
  lastModifiedDate = '';
  name = '';
  size = -1;
  type = '';
  webkitRelativePath = '';
}

export interface IProduct {
  _id: string,
  name: string,
  price: number,
  img: string,
  disabled: boolean,
  external: boolean
}

export interface IImage {
  lastModified: string;
  lastModifiedDate: string;
  name: string
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface IProductResponse {
  msg: string,
  oldProduct: IProduct,
  newProduct: IProduct
}

/* ORDERS */
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
