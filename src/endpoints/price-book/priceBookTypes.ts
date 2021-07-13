import { IPage } from '../../types/apis'

export interface IResPriceBook {
  id: number
  name: string
  description: string
  groups?: {
    group_id: number
    name: string
  }[]
}
export interface IResGetPriceBooks {
  data: IResPriceBook[]
  page: IPage
}

export type IResCreatePriceBook = Omit<IResPriceBook, 'groups'>

export interface IReqCreatePriceBook {
  name: string
  description: string
}

export interface IReqUpdatePriceBookPrices {
  price_book_id: number
  product_prices: IProductPrice[]
}

interface IProductPrice {
  product_uuid: string
  new_fix_price?: number
  new_percent_price?: number
}

export interface IReqUpdatePriceBook extends IReqCreatePriceBook {
  group_ids: number[]
  name: string
  description: string
  id: number
}

export interface IProductByPriceBook {
  product_id: string
  name: string
  base_price: number
  price_list: number
  sku: string
  discount: number
}

export interface IResGetProductByPriceBook {
  data: IProductByPriceBook[]
  page: IPage
}

export interface IReqUpdateAllDiscountPrice {
  price_book_id: number
  additional_fixed_price?: number
  new_percent_price?: number
}

export interface IResUpdatePriceBookPrices {
  new_fix_price: number
  new_percent_price: number
  product_base_price: number
  product_name: string
  product_sku: string
  product_uuid: string
}
