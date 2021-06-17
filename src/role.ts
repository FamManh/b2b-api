import apiCore from './apiCore'

export interface IResPermission {
  permission_id: number
  title: string
  created_date: number
  updated_date: null | number
  user_id: string
  description: string
}

export interface IResBudgetData {
  budget_id: number
  end_date: null | number
  start_date: null | number
  total: null | number
  type_name: string | null
  created_date: null | number
}

export interface IResRoleLabel {
  order_budget_data: IResBudgetData
  quote_budget_data: IResBudgetData
  group_id: number
  is_disable: boolean
  permission_ids: number[]
  name: string
  permission_data_list: IResPermission[]
  role_id: number
  created_date: number
}

export interface IReqRoleDetail extends API.ReqUserIdentifier {
  role_id: number
}

export interface IReqAddGroupLabel extends API.ReqUserIdentifier {
  role_id: number | null
  name: string
  permission_ids: number[]
  is_disable: boolean
  order_budget_id: number
  quote_budget_id: number
}

export const createGroupLabel: API.DigiApi<IResRoleLabel, IReqAddGroupLabel> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(`${domain}/sf/group-label`, payload, options)
  return res
}

export const updateGroupLabel: API.DigiApi<IResRoleLabel, IReqAddGroupLabel> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.put(`${domain}/sf/group-label`, payload, options)
  return res
}

export const getAllRole: API.DigiApi<IResRoleLabel[], null> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/group-label/group`, options)
  return res
}

export const getRoleDetail: API.DigiApi<IResRoleLabel, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/group-label/${payload}`, options)

  return res
}

export const getAllPermissions: API.DigiApi<IResPermission[], API.ReqUserIdentifier> = async (
  arg,
) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/permissions`, options)

  return res
}

export const deleteRole: API.DigiApi<API.ResRawData, IReqRoleDetail> = async (arg) => {
  const {
    domain,
    payload: { role_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.del(`${domain}/sf/group-label/${role_id}`, resPayload, options)

  return res
}

export const enableRole: API.DigiApi<IResRoleLabel, IReqRoleDetail> = async (arg) => {
  const {
    domain,
    payload: { role_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.put(`${domain}/sf/group-label/enable/${role_id}`, resPayload, options)

  return res
}

export const disableRole: API.DigiApi<IResRoleLabel, IReqRoleDetail> = async (arg) => {
  const {
    domain,
    payload: { role_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.put(`${domain}/sf/group-label/disable/${role_id}`, resPayload, options)

  return res
}
