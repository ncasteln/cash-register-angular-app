export type TLayoutMode = 'grid' | 'table';

/* PRODUCTS */
export class Product implements IProduct {
  _id = '';
  name = '';
  price = -1;
  priceType = AmountType.fixed;
  img = '';//new Image();
  disabled = false;
  external = false;
  tax = -1;
  weight = -1;
  weightType = AmountType.dynamic;
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
  priceType: AmountType,
  img: string,
  disabled: boolean,
  external: boolean,
  tax: number,
  weight: number
  weightType: AmountType,
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
export class Order implements IOrder {
  _id = '';
  createdAt = new Date();
  updatedAt = new Date();
  units = [];
}

export interface IOrder {
  _id: string,
  units: IUnit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUnit {
  _id: string,
  name: string,
  price: number,
  priceType: AmountType,
  external: boolean,
  tax: number,
  weight: number,
  weightType: AmountType,
  discount: number,
  subtotal: number,
  quantity: number
}

/* PRODUCT TYPE */
export enum AmountType { fixed, dynamic }
