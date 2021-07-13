import { IPage } from '../../types/apis'
import { IResCartItems } from '../quote/quoteTypes'

export type IProduct = Readonly<{
  categories: string[]
  product_uuid?: string
  product_id: string
  id: string
  sku: string
  name: string
  image_url: string
  list_price: string
  sale_price: string
  cost: number
  description: string
  image: string
  subscription: boolean
  max_price: number
  min_price: number
  period: string | null
  periods: IProduct[] | null
  price: number
  fixed_price: number
  discount: number
  product_types: number
  products: (IProduct & {
    quantity: number
  })[]
}>

export type IProducts = ReadonlyArray<IProduct>

export type IProductInCart = Omit<
  IProduct,
  'max_price' | 'min_price' | 'periods' | 'description'
> & {
  quantity: number
  id: string
  price?: number
}
export type IProductsInCart = ReadonlyArray<IProductInCart>

export interface IResGetProducts {
  data: IProducts
  page: IPage
}

export interface IResAddProductToQuote {
  checkoutData: {
    cart: {
      cart_line_item: {
        items: IResCartItems[]
      }
      customer_id: string
      // customer_id: number
    }
    id: string
    subtotal_inc_tax: number
    grand_total: number
    discount: number
  } | null
  success: boolean
}

export interface IPeriod {
  id: number
  name: string
  price: number
  cost: number
}

export interface IReqAddNewProduct {
  name: string
  description: string
  sku: string
  type: number
  categories: Array<string>
  periods?: IPeriod[]
  image: IResUploadProductImage | null
  price: number
  cost: number
}

export interface IReqUpdateProduct {
  id: string
}

export interface IReqAddNewBundleProduct extends IReqAddNewProduct {
  products: {
    id: string | number
    quantity: number
  }[]
  fixed_price: number
  discount: number
}

export interface IReqGetProductByCategoryId {
  customer_id: string
  category_id: string
}

export interface IReqAddProductToQuoteBySku {
  sku: string
  checkout_id: string
  customer_id: string
}
export interface IResProductData {
  image_url: string
  id: string
  name: string
  price: number
  description: string
  sku: string
  categories?: number[]
  variants?: {
    id: number
    option_values: {
      id: number
      label: string
      option_id: number
      option_display_name: string
    }[]
  }[]
  subscription: boolean
  transitProduct: boolean
  quoteTransitProduct: boolean
  quoteHousingProduct: boolean
  max_price: number
  min_price: number
  period: string | null
  periods: IResProductData[] | null
  fixed_price: number
  discount: number
  product_types: number
  products: IResProductData[] | null
  quantity?: number
}

export enum EPRODUCT_TYPE {
  INVALID = 0,
  NORMAL = 1,
  SUBSCRIPTION = 2,
  TRANSIT_PRODUCT = 3,
  QUOTE_TRANSIT_PRODUCT = 4,
  QUOTE_HOUSING_PRODUCT = 5,
  WEAPON_PRODUCT = 6,
  BUNDLE_PRODUCT = 7,
  SCHEDULE_PRODUCT = 8,
  JAMF_PRODUCT = 9,
}

export interface IResUploadProductImage {
  type: string
  id: string
  url?: string
}
