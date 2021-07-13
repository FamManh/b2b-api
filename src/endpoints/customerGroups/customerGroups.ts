import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import { IResRawData } from '../../types/apis'
import {
  IResCustomerGroup,
  IResGetCustomerGroup,
  IReqUpdateGroupAssignee,
  IReqUpdateGroupMaxValue,
} from './customerGroupsType'

class CustomerGroupsEndpoint extends BaseExtend {
  getCustomerGroups = async (): Promise<IResponse<IResGetCustomerGroup[]>> => {
    const res = await this.request.get(`/bo/customer-groups`)
    return res
  }

  getHQGroups = async (): Promise<IResponse<IResGetCustomerGroup[]>> => {
    const res = await this.request.get(`/bo/customer-group/head-quarters`)
    return res
  }

  getSubGroupByHQGroupId = async (
    HQGroupId: number,
  ): Promise<IResponse<IResGetCustomerGroup[]>> => {
    const res = await this.request.get(`/bo/customer-group/sub-groups/${HQGroupId}`)
    return res
  }

  updateGroupAssignee = async (
    groupAssignee: IReqUpdateGroupAssignee,
  ): Promise<IResponse<IResCustomerGroup[]>> => {
    const res = await this.request.post(`bo/update_assigneeId`, groupAssignee)
    return res
  }

  getGroupById = async (groupId: number): Promise<IResponse<IResCustomerGroup[]>> => {
    const res = await this.request.get(`/bo/internal/customer-group/${groupId}`)
    return res
  }

  updateGroupMaxValue = async (
    groupAssignee: IReqUpdateGroupMaxValue,
  ): Promise<IResponse<IResRawData[]>> => {
    const res = await this.request.put(
      `bo/customer-group/${groupAssignee.group_id}/update`,
      groupAssignee,
    )
    return res
  }
}

export default CustomerGroupsEndpoint
