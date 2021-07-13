export interface IResCustomerGroup {
  id: number
  name: string
  parent_id: number
  price_list_id: number
  category_ids: number[]
  count: number | null
  max_value: number
  valid_from: number
  valid_to: number
  max_value_quote: number
  valid_from_quote: number
  valid_to_quote: number
  assignee_id: string
  // assignee_id: number
  assignee: {
    first_name: string
    last_name: string
  }
}

export interface IReqUpdateGroupAssignee {
  // id of sell ref assignee and assigned group
  group_id: number
  customer_id: string
  // customer_id: number
}

export interface IReqUpdateGroupMaxValue {
  group_id: number
  max_value: number
  valid_from: number
  valid_to: number
  max_value_quote: number
  valid_from_quote: number
  valid_to_quote: number
}

export interface IResGetCustomerGroup extends Pick<IResCustomerGroup, 'id' | 'name'> {
  type: string
}
