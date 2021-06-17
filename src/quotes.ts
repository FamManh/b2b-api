import apiCore from './apiCore'

import { IConsignment } from './order'
import { IAddress } from './users'

export enum ExtType {
  INTERNAL_SYSTEM_TYPE = 1,
  EXTERNAL_SALES_FORCE_TYPE = 2,
}
export interface IResQuoteHistory {
  checkoutData: {
    id: string
    cart: {
      split: boolean
      cart_line_item: {
        items: API.IProductsInCart
      }
      split_order_data?: IConsignment[] | null
      default_address: IAddress
    }
    subtotal_inc_tax: number
    grand_total: number
    discount: number
  } | null
  quoteData: {
    quoteId: string
    updateDate: number
    expireDate: number
    description: string
    customerId: string
    status: string
    freightCost: number
    validUntilDate: number
    paymentTermText: string
    assigneeId: number
    customer_firstname: string
    customer_lastname: string
    customerApprovalLastName: string
    customerApprovalFirstName: string
    customerAssigneeFirstName: string
    customerAssigneeLastName: string
    groupId: number
    quoteComment: string | null
    quote_accepted_payment_methods: number[]
  }
  extType: ExtType
}
//fake modal to run api cancel quote when status is offered
export interface IResQuoteComment {
  status: string
  quoteComment: string
}

export type IQuoteHistory = Omit<API.IQuote, 'products'>

export interface IResNewQuote {
  quoteData: {
    quoteId: string
  }
}

export interface IReqCreateAQuote {
  customer_id: string
  // customer_id: number
  cart_id: string
}

export interface IReqCreateAQuoteInProductDetail {
  customer_id: string
  // customer_id: number
  description: string
  products: {
    sku: string
    qty?: number
  }[]
}

export interface IReqUpdateAQuote {
  id: string
  customer_id: string
  // customer_id: number
  description: string
  status: string
}

interface IReqUpdateAssignee {
  quoteId: string
  customerId: string
}
export interface IReqQuoteComment {
  id: string
  quote_comment: string
}

export const createAQuoteInCart: API.DigiApi<IResNewQuote, IReqCreateAQuote> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/quote`, payload, options)

  return res
}

export const createAQuoteInProductDetail: API.DigiApi<
  IResNewQuote,
  IReqCreateAQuoteInProductDetail
> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/quote/product-request-quote`, payload, options)

  return res
}

interface IResUpdateAQuoteInCart {
  success: boolean
  message: string
}

export interface IResCancelAQuote extends Pick<IResQuoteHistory, 'checkoutData'> {
  status: string
  data: {
    status: string
  }
}

export interface IReqGetQuoteDetail {
  quoteId: string
  extType: number
}

export const updateAQuoteInCart: API.DigiApi<IResUpdateAQuoteInCart, IReqUpdateAQuote> = async (
  arg,
) => {
  const { domain, payload, options } = arg
  const res = await apiCore.put(`${domain}/sf/quote`, payload, options)

  return res
}

export const cancelAQuote: API.DigiApi<IResCancelAQuote, string> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.del(`${domain}/sf/quote/${payload}`, null, options)
  return res
}

export const cancelOfferedQuote: API.DigiApi<IResCancelAQuote, string> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.del(`${domain}/sf/quote/offered/cancel/${payload}`, null, options)
  return res
}

export const getQuotesHistory: API.DigiApi<IResQuoteHistory[], string> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/quote/u/${payload}`, options)
  return res
}

export const getQuoteDetail: API.DigiApi<IResQuoteHistory, IReqGetQuoteDetail> = async (arg) => {
  const { domain, payload, options } = arg
  const { quoteId, extType } = payload
  const res = await apiCore.get(`${domain}/sf/quote/q/${quoteId}?extType=${extType}`, options)

  return res
}

export const getQuoteListByGroup: API.DigiApi<IResQuoteHistory[], number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/quotes/group/${payload}`, options)

  return res
}

export const updateQuoteAssignee: API.DigiApi<API.ResRawData, IReqUpdateAssignee> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.put(`${domain}/sf/quote/assignee`, payload, options)
  return res
}

export const submitQuoteComment: API.DigiApi<IResQuoteComment, IReqQuoteComment> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.put(`${domain}/sf/quote-comment`, payload, options)

  return res
}

export const downloadQuotePDF: API.DigiApi<string, string> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/quote-download/${payload}`, options)

  return res
}
