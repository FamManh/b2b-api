import { IPage } from '../../types/apis'

export interface ICategory {
  id: string
  parent_id: number
  name: string
  label: null | string
  description: string
  visible: boolean
  slug: string | null
}

export interface IReqGetCategories {
  customer_id: string
  group_id: number
}

export interface IReqCategory {
  name: string
  slug: string
  description: string
  status: boolean
}

export interface IReqUpdateCategory extends IReqCategory {
  id: string
}

export interface IResListCategory {
  data: ICategory[]
  page: IPage
}
