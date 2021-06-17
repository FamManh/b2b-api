import apiCore from './apiCore'
import { IConsignment } from './order'
import { IAddress } from './users'

export interface IResCartData {
  id: string
  grand_total: number
  subtotal_ex_tax: number
  discount: number
  cart: {
    cart_line_item: {
      items: API.IProductsInCart
    }
    cart_number: string
    id: string
  }
}

export interface IResCartWithConsignment {
  id: string
  grand_total: number
  subtotal_ex_tax: number
  discount: number
  cart: {
    cart_line_item: {
      items: API.IProductsInCart
    }
    cart_number: string
    default_address: IAddress
    id: string
  }
  split?: boolean
  split_order_data?: IConsignment[] | null
}

export interface IResUpdatedCart extends Pick<API.ResRawData, 'success'> {
  checkoutData: IResCartWithConsignment
}

export interface IResSaveCart {
  cart_status: number
}

export interface IResSavedCartDetail {
  id: string
  cart_name: string
  cart_description: string
  cart_saved_date: number
  qty: number
  cart_line_item: {
    items: API.IProductsInCart
  }
  cart_number: string
  cart_sub_total: number
}

export interface IReqUpdateCart {
  checkout_id: string
  //customer_id: number
  customer_id: string
  line_items: {
    id?: string | undefined
    quantity?: number
    productId?: string
  }[]
}

export interface IReqAddToCart {
  checkout_id: string
  // customer_id: number
  customer_id: string
  line_items: {
    product_id: string
    quantity: number
    fixed_price?: number
  }[]
}

interface IReqCreateSavedCart {
  // customer_id: number
  customer_id: string
  current_cart_number: string
  save_cart_number?: string
  is_save_current_shopping_cart?: boolean
  is_make_copy?: boolean
  name: string
  description: string
}

export interface ResValidateOrderMaxValue {
  // customer_id: number
  customer_id: string
  max_value: number
  isValid: boolean
}

interface IReqCreateSavedCartQuickOrder
  extends Pick<IReqCreateSavedCart, 'customer_id' | 'name' | 'description'> {
  line_items: {
    product_id: string
    quantity: number
    list_price: number
  }[]
}

export interface ReqReAPISavedCart
  extends Pick<IReqCreateSavedCart, 'customer_id' | 'name' | 'current_cart_number'> {
  save_cart_number: string
  is_make_copy: boolean
  is_save_current_shopping_cart: boolean
}

export interface IReqDeleteSavedCart {
  // customer_id: number
  customer_id: string
  save_cart_number: string
}

export interface ReqShareSavedCart {
  shared_customer_id: number
  // customer_id: number
  customer_id: string
  cart_number: string
}

export type ReqEditSavedCart = Pick<
  IReqCreateSavedCart,
  'save_cart_number' | 'description' | 'name'
>

export const getCartDetail: API.DigiApi<IResCartData, undefined> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/checkout`, options)
  return res
}

export const getCartWithConsignments: API.DigiApi<IResCartWithConsignment, string> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/cart-split-order-data/${payload}`, options)
  return res
}

export const updateACart: API.DigiApi<IResUpdatedCart, IReqUpdateCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResUpdatedCart> = await apiCore.post(
    `${domain}/sf/cart`,
    payload,
    options,
  )
  return res
}

export const addToCart: API.DigiApi<IResUpdatedCart, IReqAddToCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResUpdatedCart> = await apiCore.post(
    `${domain}/sf/cart`,
    payload,
    options,
  )
  return res
}

export const addMultipleItemToCart: API.DigiApi<IResUpdatedCart, IReqAddToCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResUpdatedCart> = await apiCore.post(
    `${domain}/sf/quickOrder`,
    payload,
    options,
  )
  return res
}

export const createSaveCart: API.DigiApi<IResSaveCart, IReqCreateSavedCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResSaveCart> = await apiCore.post(
    `${domain}/sf/cart/save`,
    payload,
    options,
  )
  return res
}

export const getSavedCartDetail: API.DigiApi<IResSavedCartDetail, string> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResSavedCartDetail> = await apiCore.get(
    `${domain}/sf/saved-cart/detail/${payload}`,
    options,
  )
  return res
}

export const editSavedCart: API.DigiApi<boolean, ReqEditSavedCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<boolean> = await apiCore.put(`${domain}/sf/saved-cart`, payload, options)
  return res
}

export const createSavedCartQuickOrder: API.DigiApi<boolean, IReqCreateSavedCartQuickOrder> =
  async (arg) => {
    const { domain, payload, options } = arg
    const res: API.Response<boolean> = await apiCore.post(
      `${domain}/sf/saved-carts/quick-order`,
      payload,
      options,
    )
    return res
  }

export const getSavedCartsList: API.DigiApi<IResSavedCartDetail[], string> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResSavedCartDetail[]> = await apiCore.get(
    `${domain}/sf/cart/getAllSaved/${payload}`,
    options,
  )
  return res
}

export const reAPISavedCart: API.DigiApi<IResSavedCartDetail, ReqReAPISavedCart> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/saved-cart/reAPI`, payload, options)
  return res
}

export const deleteSavedCart: API.DigiApi<IResSavedCartDetail[], IReqDeleteSavedCart> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResSavedCartDetail[]> = await apiCore.del(
    `${domain}/sf/saved-cart`,
    payload,
    options,
  )

  return res
}

export const validateOrderMaxValue: API.DigiApi<ResValidateOrderMaxValue, string> = async (arg) => {
  const { domain, payload: customer_id, options } = arg
  const res = await apiCore.post(`${domain}/sf/validation-checkout`, { customer_id }, options)

  return res
}

export const shareSavedCart: API.DigiApi<ReqShareSavedCart, ReqShareSavedCart> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/saved-cart/share`, payload, options)

  return res
}
export type IResProductByCSV = API.IProductInCart & { product_uuid: string }
// =============== import SKU CSV for quick add products ===============
export const getProductsFromSkuCsv: API.DigiApi<IResProductByCSV[], FormData> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/cart/import`, payload, options, undefined, true)

  return res
}
