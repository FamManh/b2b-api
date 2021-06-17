import apiCore from './apiCore'
import { IAddress } from './users'

export interface IOrderProduct
  extends Omit<API.IProductInCart, 'image_url' | 'list_price' | 'sale_price'> {
  price_ex_tax: number
  variant_id: number
  total_ex_tax: number
  image: string
}


export interface IConsignment {
  split_order_id: number
  split_order_number?: string
  address: IAddress | null
  cart_line_item: {
    items: API.IProductsInCart
  }
  cart_number: string
}
export interface IResProductData {
  productImageUrl: string
  id: string
  name: string
  price: number
  description: string
}

export interface IReqCreateOrder {
  // customer_id: number
  customer_id: string
  cart_id: string
  quote_id?: string
  status: number
  payment_method: string
  payment_method_type: number
  shipping_method: string
  url_po?: string
  shipping_addresses: [
    {
      first_name: string
      last_name: string
      city: string
      state: string
      country: string
      postal_code: string
      company: string
      street_1: string
      street_2: string
      country_iso2: string
      email: string
      phone: string
    },
  ]
  billing_address: {
    first_name: string
    last_name: string
    city: string
    state: string
    country: string
    postal_code: string
    company: string
    street_1: string
    street_2: string
    country_iso2: string
    email: string
    phone: string
  }
  products: null | string
  freight_cost?: string
  order_type: number
}

export interface IBillingAddress {
  first_name: string | null
  last_name: string | null
  company: string | null
  email: string | null
  address1: string | null
  address2: string | null
  state: string | null
  state_or_province: string | null
  postal_code: string | null
  phone: string | null
  address_type: string | null
  // customer_id: number
  customer_id: string
  id: number | string
  country: string | null
  city: string | null
  country_iso2: string | null
  street_1: string | null
  street_2: string | null
}

export interface IShippingAddress {
  first_name: string | null
  last_name: string | null
  company: string | null
  email: string | null
  state: string | null
  phone: string | null
  // customer_id: number
  customer_id: string
  country: string | null
  city: string | null
  country_iso2: string | null
  street_1: string | null
  street_2: string | null
  zip: string | null
}

export interface IResOrder {
  id: string
  customer_id: string
  status: string
  cart_id: string
  billing_address: IBillingAddress
  total_ex_tax: number
  date_created: number
}

export interface IResOrderList {
  data: IResOrder[]
  page: IPage
}

export interface IPage {
  limit: number
  page: number
  total_page: number
  total_record: number
}
export interface IResOrderDetail {
  freight_cost?: string
  id: number
  total_ex_tax: number
  subtotal_ex_tax: number
  // discount: number
  status: string
  products: IOrderProduct[]
  billing_address: IBillingAddress
  shipping_address: IShippingAddress
  payment_method: string
  shipping_method: string
  discount_amount: string
  // customer_id: number
  customer_id: string
  payment_method_type: number
  split_order_data: IConsignment[] | null
}

export const createAnOrder: API.DigiApi<IResOrderDetail, IReqCreateOrder> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/orders`, payload, options)

  return res
}

export const getOrderDetail: API.DigiApi<IResOrderDetail, string | string[]> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/detailOrder/${payload}`, options)

  return res
}

export const getOrderListByCustomer: API.DigiApi<IResOrderList, null> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/orders`, options)

  return res
}

export const getOrderListByGroup: API.DigiApi<IResOrder[], number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/orders/group/${payload}`, options)

  return res
}
export interface ReqReOrderWithCreateSavedCart {
  order_id: number
  // customer_id: number
  customer_id: string
  is_save_shopping_cart: boolean
  saved_cart_name: string | Date
  saved_cart_description: string
}

export type ReqReNewWithCreateSavedCart = Omit<ReqReOrderWithCreateSavedCart, 'order_id'> & {
  sku: string
}

export interface ResReOrderWithCreateSavedCart {
  cart_created_date: number
  cart_description: string
  cart_line_item: null
  cart_name: string
  cart_number: string
  cart_saved_date: number
  cart_status: number
  cart_sub_total: number
  cart_updated_date: number
  // customer_id: number
  customer_id: string
  deleted: null
  id: string
  qty: number
}

export const reOrderWithCreateSavedCart: API.DigiApi<
  ResReOrderWithCreateSavedCart,
  ReqReOrderWithCreateSavedCart
> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/re-order`, payload, options)

  return res
}

export const reNewProductWithCreateSavedCart: API.DigiApi<
  ResReOrderWithCreateSavedCart,
  ReqReNewWithCreateSavedCart
> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/renew`, payload, options)

  return res
}

interface IReqConsignmentDetail {
  product_uuid: string
  quantity: number
}
export interface IReqCreateConsignment {
  address: {
    address_id: number
  }
  split_order_detail: IReqConsignmentDetail[]
  cart_number: string | null
  split_order_id?: number
  quote_id: string | null
}

export const createConsignment: API.DigiApi<IConsignment[], IReqCreateConsignment> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/split-order`, payload, options)

  return res
}

export interface IReqUpdateConsignment extends IReqCreateConsignment {
  split_order_id: number
}

export const updateConsignment: API.DigiApi<IConsignment[], IReqUpdateConsignment> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/split-order`, payload, options)

  return res
}

export interface IResGetConsignment {
  id: string
  cart: {
    split: boolean
    // customer_id: number
    customer_id: string
    cart_number: string
    cart_line_item: {
      items: Store.IProductsInCart
    }
    consignment_data: IConsignment[]
    default_address: IAddress
  }
  subtotal_inc_tax: number
  subtotal_ex_tax: number
  grand_total: number
  discount: number
}

export const getConsignment: API.DigiApi<IResGetConsignment, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/cart-consignment-data/${payload}`, options)

  return res
}

export const removeConsignment: API.DigiApi<boolean, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.del(`${domain}/sf/split-order/${payload}`, null, options)
  return res
}
