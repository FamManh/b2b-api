import { IResCustomer } from '../customer'
import { IPage } from '../../types/apis'
import { IProductInCart, IProductsInCart } from '../product'
import { IAddress } from '../user'

export interface IResOrderDetail extends IResOrder {
  freight_cost?: string
  subtotal_ex_tax: number
  subtotal_inc_tax: number
  // discount: number
  products: IOrderProduct[]
  shipping_address: IShippingAddress[]
  payment_method: string
  discount_amount: string
  company_of_customer?: string
  split_order_data: IConsignment[] | null
  shipping_method: string
  payment_method_type: number
  url_po: string
}

export interface IResGetOrders {
  data: IResOrderDetail[]
  page: IPage
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
  customer_id: string
  // customer_id: number
  id: number | string
  country: string | null
  city: string | null
  country_iso2: string | null
  street_1: string | null
  street_2: string | null
}
export interface IResOrder {
  id: number
  customer_id: string
  customer: IResCustomer | null
  // customer_id: number
  status: string
  cart_id: string
  billing_address: IBillingAddress | null
  total_ex_tax: number
  date_created: number
}
export interface IOrderProduct
  extends Omit<IProductInCart, 'image_url' | 'list_price' | 'sale_price'> {
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
    items: IProductsInCart
  }
  cart_number: string
}

export interface IShippingAddress {
  first_name: string | null
  last_name: string | null
  company: string | null
  email: string | null
  state: string | null
  phone: string | null
  customer_id: string
  // customer_id: number
  country: string | null
  city: string | null
  country_iso2: string | null
  street_1: string | null
  street_2: string | null
  zip: string | null
}

export interface IResOrderDetail extends IResOrder {
  freight_cost?: string
  subtotal_ex_tax: number
  subtotal_inc_tax: number
  // discount: number
  products: IOrderProduct[]
  shipping_address: IShippingAddress[]
  payment_method: string
  discount_amount: string
  company_of_customer?: string
  split_order_data: IConsignment[] | null
  shipping_method: string
  payment_method_type: number
}

export interface IReqCreateOrder {
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
