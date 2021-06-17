import apiCore from './apiCore'

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
  baseProduct?: boolean
}

export interface IReqGetProductBySku {
  sku: string
}

export interface IReqGetProductByProductId {
  product_id: string | string[]
  // customer_id: number
  customer_id: string
}

export interface IReqGetProductByCategoryId {
  category_id: string | string[]
}

export const getAllProducts: API.DigiApi<IResProductData[]> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/products`, options)

  return res
}

export const getProductBySku: API.DigiApi<IResProductData, IReqGetProductBySku> = async (arg) => {
  const {
    domain,
    payload: { sku },
    options,
  } = arg
  const res = await apiCore.get(`${domain}/sf/product/sku/${sku}`, options)

  return res
}

// export const getProductByProductId: API.DigiApi<
//   IResProductData,
//   IReqGetProductByProductId
// > = async (arg) => {
//   const {
//     domain,
//     payload: { product_id, customer_id },
//     options,
//   } = arg
//   const res = await apiCore.post(
//     `${domain}/sf/product/${product_id}`,
//     {
//       customer_id,
//     },
//     options,
//   )

//   return res
// }

export const getProductsByCategoryId: API.DigiApi<IResProductData[], IReqGetProductByCategoryId> =
  async (arg) => {
    const {
      domain,
      payload: { category_id },
      options,
    } = arg
    const res = await apiCore.get(`${domain}/sf/category/${category_id}`, options)

    return res
  }
