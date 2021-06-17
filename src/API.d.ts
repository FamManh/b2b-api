interface Options<T> {
  willCallApi?: () => void
  didCallApi?: () => void
  errorDefaultText?: string
  successDefaultText?: string
  onError?: (message: string, code: number) => void
  onSuccess?: (data: T | null, message: string) => void
  query?: Record<string, string | number>
}

interface Get {
  (
    path: string,
    options?: Options<any>,
    AbortSignal?: AbortSignal | null,
    headers?: Record<string, string>,
  ): any
}

interface Post {
  (
    path: string,
    data: any,
    options?: Options<any>,
    AbortSignal?: AbortSignal | null,
    bodyTypeIsForm?: boolean,
    headers?: Record<string, string>,
  ): any
}
export interface Delete {
  (path: string, data: any, options?: Options<any>, headers?: Record<string, string>): any
}

interface Response<T> {
  data: T
  hasError: boolean
  code: number
  message: string
}

interface ResRawData {
  message: string | null
  success: boolean
}

interface ReqUserIdentifier {
  customer_id: string
  group_id: number
}

interface DigiApiArgument<R, P> {
  payload: P
  domain?: string
  options?: Options<R>
}

interface DigiApi<R, P = any> {
  (arg: DigiApiArgument<R, P>): Promise<Response<R>>
}

type IProduct = Readonly<{
  product_id: string
  sku: string
  name: string
  image_url: string
  list_price: string
  sale_price: string
  description: string
  image: string
  subscription: boolean
  max_price: number
  min_price: number
  period: string | null
  periods: ICart[] | null
}>

type IProductInCart = Omit<IProduct, 'max_price' | 'min_price' | 'periods' | 'description'> & {
  quantity: number
  id: string
}
type IProductsInCart = ReadonlyArray<IProductInCart>

type IProducts = ReadonlyArray<IProduct>

type ISavedCarts = ReadonlyArray<{ id: string; cart_number: string }>

type ICart = Readonly<{
  id: string
  cart_number: string
  items: IProductsInCart
  grand_total: number
  subtotal: number
  saved_carts: ISavedCarts
  discount: number
  split: boolean
}>

type IQuote = Readonly<{
  id: string
  quoteId: string
  products: IProductsInCart
  status: string
  update_date: string
  description: string
  extType: number
}>

type BreadCrumbsMap = {
  page: string
  href: string
  items: BreadCrumbsMap[]
}

type BreadCrumbs = Omit<BreadCrumbsMap, 'items'>[]

type IQuotes = ReadonlyArray<IQuote>

interface IShippingCard {
  full_name: string
  address: string
  city: string
  country: string
  country_iso2: string
  state: string
  postal_code: string
  zip: string
  isDefault: boolean
}

interface IPaymentCard {
  number: string
  expiry: string
  name: string
  cvc: string
}

type ICheckout = Readonly<{
  isUsePO: boolean
  address: IShippingCard
  payments: {
    credit: IPaymentCard
    purchaseOrder: {
      PONumber: string
    }
  }
}>

type IUser = Readonly<{
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
  company: string
  customer_group_id: number
  account_role: EUserRole
  group_name: string
  can_assign_quote: boolean
}>

type IProcess = Readonly<{
  isLoading: boolean
  errorMessage: string
  notificationMessage: string
  breadCrumbsMap: BreadCrumbsMap
  errorHttpStatusCode: number | string
}>

type ICategory = ReadonlyArray<{
  id: number | string
  parent_id?: number
  name: string
  link: string
}>

type IConfig = Readonly<{
  productViewMode: 'grid' | 'list'
  language: string
}>


export as namespace API
