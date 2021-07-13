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

export type IProductInCart = Omit<
  IProduct,
  'max_price' | 'min_price' | 'periods' | 'description'
> & {
  quantity: number
  id: string
  price?: number
}
