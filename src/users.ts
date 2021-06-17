import apiCore from './apiCore'

export enum EPaymentMethod {
  NOT_SET_YET,
  PO,
  CREDIT_CARD,
}

export enum EShippingMethod {
  NOT_SET_YET,
  STANDARD,
  EXPEDITED,
}

export enum EUserRole {
  ANONYMOUS = 'ANONYMOUS',
  AOHQ = 'AOHQ',
  MOHQ = 'MOHQ',
  AOSG = 'AOSG',
  MOSG = 'MOSG',
}

export const accountRoles: Record<EUserRole, string> = {
  ANONYMOUS: 'Anonymous',
  AOHQ: 'Admin of Headquarter',
  MOHQ: 'Member of Headquarter',
  AOSG: 'Admin of Sub-group',
  MOSG: 'Member of Sub-group',
}

export interface IResUserDetail {
  buyer: boolean
  is_admin: boolean
  id: string
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  customer_group_id: number
  customer_list_price: number
  date_created: number
  date_modified: number
  notes: string
  group_name: string
  is_enabled: boolean
  group_label_id: number
  group_label_name: string
}

export interface INewUser {
  email: string
  first_name: string
  last_name: string
  customer_group_id: number
  is_admin: boolean
  is_buyer?: boolean
  phone: string
  company: string
  notes: string
  is_enabled: boolean
  group_label_id: number
  authentication?: {
    force_password_reset: boolean
    new_password: string
  }
}

export interface IReqCreateUser {
  userId: string
  createData: INewUser
}
export interface IReqUpdateUser {
  userId: string
  updateData: INewUser & { id: string }
}

export interface IReqAddress {
  first_name: string
  last_name: string
  company: string
  address1: string
  state_or_province: string
  postal_code: string
  phone: string
  customer_id: string
  // customer_id: number
  country: string
  country_code?: string
  city: string
}

export interface IReqUser {
  customerId: string | number
  customer_id: string | number
  group_id: string | number
}

export type IReqProfile = Omit<IReqUser, 'customerId'>

export interface IUserAddress {
  first_name: string
  last_name: string
  company: string
  address1: string
  state_or_province: string
  postal_code: string
  phone: string
  country: string
  country_iso2?: string
  city: string
  is_default: boolean
  zip: string | null
}

export interface IAddress extends IUserAddress {
  address2: string | null
  address_type: string | null
  customer_id: string
  // customer_id: number
  email: string | null
  address_id: number
  state: string | null
  street_1: string | null
  street_2: string | null
  is_default: boolean
  instructions?: string
}

export interface IPermission {
  permission_id: number
  title: string
  created_date: string | number | null
  updated_date: string | number | null
  user_id: string
  description: string | null
}
export interface IResProfile {
  first_name: string
  last_name: string
  phone: string
  group_name: string
  addresses: IAddress[] | null
  permissions_data: IPermission[] | null
  email: string | null
  company: string | null
  notes: string | null
}

export const getUsers: API.DigiApi<IResUserDetail[], string | number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/list-customer/${payload}`, options)

  return res
}

export const getUsersOfGroup: API.DigiApi<IResUserDetail[], string | number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/list-customer-group/${payload}`, options)
  return res
}

export const getUserDetail: API.DigiApi<IResUserDetail, string | number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer/${payload}`, options)
  return res
}

export const createUser: API.DigiApi<IResUserDetail, IReqCreateUser> = async (arg) => {
  const {
    domain,
    payload: { createData },
    options,
  } = arg
  const res = await apiCore.post(`${domain}/sf/customer`, [createData], options)

  return res
}

export const updateUserDetail: API.DigiApi<IResUserDetail, IReqUpdateUser> = async (arg) => {
  const {
    domain,
    payload: { userId: currentUserId, updateData },
    options,
  } = arg
  const res = await apiCore.put(`${domain}/sf/customer/${currentUserId}`, [updateData], options)
  return res
}

export const removeUser: API.DigiApi<IResUserDetail, IReqUser> = async (arg) => {
  const {
    domain,
    payload: { customerId, ...resPayload },
    options,
  } = arg
  const res = await apiCore.del(`${domain}/sf/customer/${customerId}`, resPayload, options)

  return res
}

export const getUserAddress: API.DigiApi<IAddress[], string> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer/${payload}/addresses`, options)

  return res
}

export const getProfile: API.DigiApi<IResProfile> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer/information`, options)
  return res
}

export const createUserAddress: API.DigiApi<IAddress, IReqAddress> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(
    `${domain}/sf/customer/${payload?.customer_id}/address`,
    payload,
    options,
  )
  return res
}

export const updateUserAddress: API.DigiApi<IAddress, IAddress> = async (arg) => {
  const { domain, payload, options } = arg
  // const res = await apiCore.put(`${domain}/sf/customer-address`, payload, options)
  const res = await apiCore.put(
    `${domain}/sf/customer/${payload.customer_id}/address/${payload.address_id}`,
    payload,
    options,
  )
  return res
}

export interface IReqSetDefaultAddress {
  address_id: number
  is_default: boolean
}

export const updateDefaultAddress: API.DigiApi<IAddress, IReqSetDefaultAddress> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.put(`${domain}/sf/customer-address`, payload, options)
  return res
}

export const removeAddressUser: API.DigiApi<number, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.del(`${domain}/sf/customer-address/${payload}`, null, options)
  return res
}

export interface ICountry {
  id: number
  country: string
  country_iso2: string
  country_iso3: string
}

export const getCounties: API.DigiApi<ICountry[]> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/countries`, options)
  return res
}

export interface IStateProvince {
  id: number
  state: string
  state_abbreviation: string
  country_id: number
}

export const getStateProvinces: API.DigiApi<IStateProvince[], number> = async (arg) => {
  const { domain, options, payload } = arg
  const res = await apiCore.get(`${domain}/sf/state/${payload}`, options)
  return res
}

export const getDefaultPaymentMethod: API.DigiApi<EPaymentMethod, string> = async (arg) => {
  const { domain, options, payload } = arg
  const res = await apiCore.get(`${domain}/sf/payment-method/${payload}`, options)
  return res
}

export interface IReqUpdateDefaultPaymentMethod {
  payment: EPaymentMethod
  customer_id: string
  // customer_id: number
}

export const updateDefaultPaymentMethod: API.DigiApi<
  EPaymentMethod,
  IReqUpdateDefaultPaymentMethod
> = async (arg) => {
  const { domain, options, payload } = arg
  const res = await apiCore.post(
    `${domain}/sf/payment-method/${payload?.customer_id}`,
    { payment: payload?.payment },
    options,
  )
  return res
}

export const getDefaultShippingMethod: API.DigiApi<EShippingMethod, string> = async (arg) => {
  const { domain, options, payload } = arg
  const res = await apiCore.get(`${domain}/sf/shipping-method/${payload}`, options)
  return res
}

export interface IReqUpdateDefaultShippingMethod {
  shipping: EShippingMethod
  customer_id: string
  // customer_id: number
}

export const updateDefaultShippingMethod: API.DigiApi<
  EShippingMethod,
  IReqUpdateDefaultShippingMethod
> = async (arg) => {
  const { domain, options, payload } = arg
  const res = await apiCore.post(
    `${domain}/sf/shipping-method/${payload?.customer_id}`,
    { shipping: payload?.shipping },
    options,
  )
  return res
}
