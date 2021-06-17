import apiCore from './apiCore'

export interface IReqGroupList {
  // customer_id: number
  customer_id: string
  customer_group_id: number
}

export interface IReqGroupDetail extends IReqGroupList {
  group_id: number
}

interface GroupContent
  extends Pick<
    IResGroupList,
    | 'is_disabled'
    | 'name'
    | 'max_value'
    | 'valid_from'
    | 'valid_to'
    | 'max_value_quote'
    | 'valid_from_quote'
    | 'valid_to_quote'
  > {
  group_label?: number
  parent_id: number
}

export interface IReqCreateGroup extends IReqGroupList {
  content: GroupContent
}

export interface IReqEditGroup extends IReqGroupList, Pick<IReqGroupDetail, 'group_id'> {
  content: Partial<GroupContent>
}

export interface IResGroupList extends API.ResRawData {
  id: number
  name: string
  parent_id: number
  price_list_id: number
  category_ids: number[]
  max_value: number
  valid_from: number
  valid_to: number
  max_value_quote: number
  valid_from_quote: number
  valid_to_quote: number
  group_label: {
    name: string
    id: number
  }
  is_disabled: boolean
  admin: {
    first_name: string
    last_name: string
    id: number
  }[]
  members: {
    first_name: string
    last_name: string
    id: number
  }[]
  count: number
}

export interface IResDeleteGroup extends API.ResRawData {
  is_disabled: boolean
}

export const createNewGroup: API.DigiApi<IResGroupList, IReqCreateGroup> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(
    `${domain}/sf/customer-group/create`,
    {
      ...payload,
      content: {
        ...payload.content,
        admin: [],
        category_ids: [],
      },
    },
    options,
  )
  return res
}

export const editGroup: API.DigiApi<IResGroupList, IReqEditGroup> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.post(
    `${domain}/sf/customer-group/${payload.group_id}/update`,
    {
      ...payload,
      content: {
        ...payload.content,
        admin: [],
        category_ids: [],
      },
    },
    options,
  )

  return res
}

export const deleteGroup: API.DigiApi<IResDeleteGroup, IReqGroupDetail> = async (arg) => {
  const {
    domain,
    payload: { group_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.del(
    `${domain}/sf/customer-group/${group_id}/delete`,
    resPayload,
    options,
  )

  return res
}

export const disableGroup: API.DigiApi<IResDeleteGroup, IReqGroupDetail> = async (arg) => {
  const {
    domain,
    payload: { group_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.post(
    `${domain}/sf/customer-group/${group_id}/disable`,
    resPayload,
    options,
  )

  return res
}

export const enableGroup: API.DigiApi<IResDeleteGroup, IReqGroupDetail> = async (arg) => {
  const {
    domain,
    payload: { group_id, ...resPayload },
    options,
  } = arg
  const res = await apiCore.post(
    `${domain}/sf/customer-group/${group_id}/enable`,
    resPayload,
    options,
  )

  return res
}

export const getGroupByGroupId: API.DigiApi<IResGroupList, number> = async (arg) => {
  const { domain, payload, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer-group/${payload}`, options)
  return res
}

export const getGroupsListByUser: API.DigiApi<IResGroupList[], IReqGroupList> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer-group/subs`, options)

  return res
}

export const getAllGroupsByAdmin: API.DigiApi<IResGroupList[], null> = async (arg) => {
  const { domain, options } = arg
  const res = await apiCore.get(`${domain}/sf/customer-group/all-groups`, options)

  return res
}
