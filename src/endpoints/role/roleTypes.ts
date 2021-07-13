import {IPage} from '../../types/apis'
export interface IPermissionItem {
  code: string
  name: string
}

export interface IPermissionAction {
  code: string
  name: string
  enable: boolean
  value: boolean
}

export interface IPermission {
  item: IPermissionItem
  actions: IPermissionAction[]
}

export interface IRole {
  role_code: number
  role_name: string
  role_description: string
  enable: boolean
  max_approval: number
  max_discount_percent: number
  permissions: IPermission[]
  permissions_code?: string[] | null
}

export interface IResGetRoles {
  data: IRole[]
  page: IPage
}

export interface IReqCreateRole {
  role_name: string
  role_description: string
}

export interface IReqUpdateRole {
  role_code: number
  role_name: string
  role_description: string
  enable: boolean
  max_approval: number | string
  max_discount_percent: number | string
  permissions_code: string[]
}
