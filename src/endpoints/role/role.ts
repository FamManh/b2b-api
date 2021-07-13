import BaseExtend from '../../extends/base'
import { IDigiApi, IResponse } from '../../types/apis'
import { buildURL } from '../../utils/helpers'

import { IRole, IReqUpdateRole, IReqCreateRole, IResGetRoles } from './roleTypes'

class RoleEndpoint extends BaseExtend {
  getAllRoles: IDigiApi<IRole[]> = async () => {
    const res = await this.request.get('/bo/all-roles')
    return res
  }

  getRoleByRoleCode = async (roleCode: number | string): Promise<IResponse<IRole>> => {
    const res = await this.request.get(`/bo/role/${roleCode}`)
    return res
  }

  getRoles: IDigiApi<IResGetRoles> = async () => {
    const res = await this.request.get(
      buildURL(`/bo/roles`, { limit: this.limit, page: this.page }),
    )
    return res
  }

  updateRole = async (payload: IReqUpdateRole): Promise<IResponse<IRole>> => {
    const res = await this.request.put(`/bo/role`, payload)
    return res
  }

  createRole = async (role: IReqCreateRole): Promise<IResponse<IRole>> => {
    const res = await this.request.post(`/bo/role`, role)
    return res
  }

  enableRole = async (roleId: number): Promise<IResponse<boolean>> => {
    const res = await this.request.put(`/bo/role/${roleId}/enable`, roleId)

    return res
  }

  disableRole = async (roleId: number): Promise<IResponse<boolean>> => {
    const res = await this.request.put(`/bo/role/${roleId}/disable`, roleId)
    return res
  }

  deleteRole = async (roleId: number | string): Promise<IResponse<boolean>> => {
    const res = await this.request.del(`/bo/role/${roleId}`, roleId)
    return res
  }

  getEmployeeRole: IDigiApi<IRole> = async () => {
    const res = await this.request.get(`/bo/employee/role`)
    return res
  }
}

export default RoleEndpoint
