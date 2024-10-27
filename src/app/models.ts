export interface IProduct {
  name: string,
  price: number,
  img: string,
  alt: string,
  disabled: boolean,
  external: boolean
}

export interface ICurrentOrder extends IProduct {
  quantity: number
}

export interface IOrder {
  _id: string,
  cassa: boolean,
  products: ICurrentOrder[],
  total: number
}
