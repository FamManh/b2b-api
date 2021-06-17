import apiCore from './apiCore'

export interface ReqGetCategoriesPayload {
  // customer_id: number
  customer_id: string
  customer_group: number
}

export const getCategories: API.DigiApi<API.ICategory> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/internal/categories`, options)

  return res
}
