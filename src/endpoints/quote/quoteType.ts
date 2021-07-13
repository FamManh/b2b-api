import {IProductInCart} from '../../types/store';
import {IPage} from '../../types/apis';

export interface IQuoteData {
  customerId: string // user of quote ID
  description: string
  fixedPrice: number | null
  freightCost: number | null
  paymentTermText: string | null
  percentDiscount: number | null
  status?: string
  validUntilDate: number | null
  quote_accepted_payment_methods: number[]
}

export interface QuoteItems {
  discount?: number | null
  id?: string
  product_id: string
  quantity: number
  variant_id?: string | null
  type_percent?: boolean
}

export interface commonQuoteData extends IQuoteData {
  assigneeId: string
  cartId: string
  createDate: number
  expireDate: number | null
  expired: boolean
  groupName: string | null
  name: string | null
  quoteComment: string | null
  updateDate: number
}

export interface IQuoteCustomer {
  customerApprovalFirstName: string | null
  customerApprovalLastName: string | null
  customerAssigneeFirstName: string
  customerAssigneeLastName: string
  customer_firstname: string
  customer_lastname: string
}

//-----------------------Request

export interface IReqUpdateQuoteItems {
  quote_id: string
  checkout_id: string
  customer_id: string
  line_items: QuoteItems[]
}

export interface IReqSetQuoteAssignee {
  assignee_Id: string
  id: string // quote ID
}

export interface IReqInitializeQuote {
  assignee: string
  cart_id: string | null
  description: string
  group_id: number
  name: string
}

//-----------------------/Request
export interface IReqUpdateAQuote {
  id: string
  description: string
  fixedPrice: number | null
  freightCost: number | null
  paymentTermText: string | null
  percentDiscount: number | null
  status?: string
  quote_accepted_payment_methods: number[]
  customerId?: string // user of quote ID
  customer_id?: string // logged user ID
  // customer_id: number // logged user ID
  name?: string
  validUntilDate: Date
}

export interface IReqRejectAQuote {
  id: string
  status: string
  customer_id: string
  // customer_id: number
}

//-----------------------Response
export interface IResCheckoutData {
  cart: {
    cart_line_item: {
      items: IResCartItems[]
    }
  }
  discount: number
  grand_total: number
  id: string
  subtotal_inc_tax: number
  tax_total: number
}

export interface IResCartItems extends IProductInCart {
  discount: number
  discount_percent: number
  margin: number
  price_ex_tax: number
  total_ex_tax: number
  variant_id?: string
}

export interface IResQuoteData extends IQuoteData, IQuoteCustomer {
  assigneeId: string
  cartId: string
  createDate: number
  deleted: boolean
  groupId: number
  quoteId: string
  name: string | null
  groupName: string | null
  updateDate: number
  quoteComment: string | null
}

export interface IResQuoteDetail {
  checkoutData: IResCheckoutData | null
  create: boolean
  extType: number
  quoteData: IResQuoteData
}

export interface IResUpdateQuoteItems {
  success: boolean
  checkoutData: IResCheckoutData | null
}

export interface IReqQuoteDetail {
  quoteId: string
  extType: number
}

export interface IResQuoteList {
  data: IResQuoteDetail[]
  page: IPage
}
