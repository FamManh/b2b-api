import { IRole } from '../role'

export interface IReqLogin {
  email: string
  password: string
  is_buyer?: boolean
}

export interface IResLogin {
  id: string
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  notes: string
  date_created: string | null
  date_modified: string | null
  is_admin: boolean
  admin: boolean
  is_default: boolean
  is_disabled: boolean
  access_token: string
  role: IRole
}
