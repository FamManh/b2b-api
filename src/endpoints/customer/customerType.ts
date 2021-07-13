import { IPage } from '../../types/apis'
import { IAddress, IFormalUser } from '../user/userType'

export interface IResEmployees {
  data: IResEmployee[]
  page: IPage
}
export interface IResCustomers {
  data: IResCustomer[]
  page: IPage
}
export interface IResEmployee extends IResCustomer {
  role: IPage
}

export interface IResCustomer extends IFormalUser {
  id: string
  email: string
  company: string
  deleted: boolean
  buyer: boolean
  admin: boolean
  enabled: boolean
  default?: boolean
  customer_group_id: number
  customer_list_price: number
  date_created: number
  date_modified: number
  notes: string
  group_name: string
  address_ids: number[]
  category_ids: number[]
  addresses: null
  budget_id: number
  order_weekly_remaining_budget: number
  order_monthly_remaining_budget: number
  order_Quarterly_remaining_budget: null
  order_Yearly_remaining_budget: null
  group_label_id: number
  group_label_name: string
  is_admin: boolean
  is_buyer: boolean
  is_disabled: boolean
  account_role?: null
  is_deleted: boolean
  quote_budget_id: number
  quote_weekly_remaining_budget: number
  quote_monthly_remaining_budget: number
  quote_Quarterly_remaining_budget: null
  quote_Yearly_remaining_budget: null
  can_assign_quote: boolean
}

export interface IReqCreateCustomer {
  id: string
  first_name: string
  last_name: string
  email: string
  company: string
  phone: string
  notes: string
  customer_group_id: number
  authentication: {
    new_password: string
  }
  is_buyer: boolean
  is_admin: boolean
  is_disabled: boolean
  addresses: IAddress[]
}

export interface IReqCreateEmployee
  extends Omit<IReqCreateCustomer, 'customer_group_id' | 'addresses'> {
  role_code: number
}
