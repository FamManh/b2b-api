import apiCore from './apiCore'

export interface IResBudgetData {
  budget_id: number
  end_date: number
  start_date: number
  total: number
  type_id: number
  type_name: string
  created_date: number
}

export interface IResBudgetDetail extends Omit<IResBudgetData, 'type'> {
  type: null | number | string
}

export interface IReqCreateBudget {
  total: number
  user_id: string
  group_id: number
  start_date: number | Date
  end_date: number | Date
}

export interface IReqBudgetDetail extends API.ReqUserIdentifier {
  budget_id: number
}

export interface IReqUpdateBudget extends IReqCreateBudget {
  id: number
}

export const getAllBudgets: API.DigiApi<IResBudgetData[], null> = async (arg) => {
  const { domain, options } = arg
  const res: API.Response<IResBudgetData[]> = await apiCore.get(`${domain}/sf/budgets`, options)
  return res
}

export const getBudgetDetail: API.DigiApi<IResBudgetDetail, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResBudgetDetail> = await apiCore.get(
    `${domain}/sf/budget/${payload}`,
    options,
  )
  return res
}

export const createBudget: API.DigiApi<IResBudgetDetail, IReqCreateBudget> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResBudgetDetail> = await apiCore.post(
    `${domain}/sf/budget`,
    payload,
    options,
  )
  return res
}

export const updateBudget: API.DigiApi<IResBudgetDetail, IReqUpdateBudget> = async (arg) => {
  const { domain, payload, options } = arg
  const res: API.Response<IResBudgetDetail> = await apiCore.put(
    `${domain}/sf/budget`,
    payload,
    options,
  )

  return res
}

export const deleteBudget: API.DigiApi<IResBudgetDetail, IReqBudgetDetail> = async (arg) => {
  const {
    domain,
    payload: { budget_id, ...resPayload },
    options,
  } = arg
  const res: API.Response<IResBudgetDetail> = await apiCore.del(
    `${domain}/sf/budget/${budget_id}`,
    resPayload,
    options,
  )
  return res
}

export interface IResBudgetTypes {
  id: number
  name: string
}

export const getBudgetTypes: API.DigiApi<IResBudgetTypes[]> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/all-budget-type`, options)

  return res
}
