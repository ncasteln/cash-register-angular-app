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
  deleted = false;
  measureType = MeasureType.kg;
  category = Category.other;
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
  deleted: boolean,
  measureType: MeasureType,
  category: Category
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

export interface IOrderResponse {
  msg: string,
  oldOrder: IOrder,
  newOrder: IOrder
}

/* ORDERS */
export class Order implements IOrder {
  _id = '';
  createdAt = new Date();
  updatedAt = new Date();
  units = [];
  marked = false;
}

export interface IOrder {
  _id: string,
  units: IUnit[];
  createdAt: Date;
  updatedAt: Date;
  marked: boolean;
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
  quantity: number, // RENAME
  measureType: MeasureType, // change to string ?
  category: Category,
  marked: boolean
}

/* TYPES */
export enum Category {
  'vegetable',
  'animal',
  'baked',
  'other'
}

export enum AmountType {
  fixed = 'fixed',
  dynamic = 'dynamic'
}

export enum MeasureType {
  kg = 'kg',
  unit = 'unit'
}

export const categories = [
  { cat: 'all', text: 'Tutti' },
  { cat: 'vegetable', text: 'Verdura e frutta' },
  { cat: 'animal', text: 'Uova, salumi, latticini' },
  { cat: 'baked', text: 'Prodotti da forno' },
  { cat: 'other', text: 'Altro' },
  { cat: 'deleted', text: 'Rimossi' }
]
