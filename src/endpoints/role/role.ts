import BaseExtend from '../../extends/base'
import { IDigiApi } from '../../types/apis'
import { buildURL } from '../../utils/helpers'

import { IRole, IResGetRoles } from './roleTypes'

class RoleEndpoint extends BaseExtend {
  getAllRoles: IDigiApi<IRole[]> = async () => {
    const res = await this.request.get(`/bo/all-roles`)
    return res
  }

  // getRoleByRoleCode: API.DigiApi<IRole, string> = async ({ payload }) => {
  //   const res = await this.request.get(`/bo/role/${payload}`);
  //   return res;
  // };

  getRoles: IDigiApi<IResGetRoles> = async () => {
    const res = await this.request.get(
      buildURL(`/bo/roles`, { limit: this.limit, page: this.page }),
    )
    return res
  }

  // updateRole: API.DigiApi<IRole, IReqUpdateRole> = async ({ payload }) => {
  //   const res = await this.request.put(`/bo/role`, payload);

  //   return res;
  // };

  // createRole: API.DigiApi<IRole, IReqCreateRole> = async ({ payload }) => {
  //   const res = await this.request.post(`/bo/role`, payload);

  //   return res;
  // };

  // enableRole: API.DigiApi<boolean, number> = async ({ payload }) => {
  //   const res = await this.request.put(`/bo/role/${payload}/enable`, payload);

  //   return res;
  // };

  // disableRole: API.DigiApi<boolean, number> = async ({ payload }) => {
  //   const res = await this.request.put(`/bo/role/${payload}/disable`, payload);

  //   return res;
  // };

  // deleteRole: API.DigiApi<boolean, number> = async ({ payload }) => {
  //   const res = await this.request.del(`/bo/role/${payload}`, payload);

  //   return res;
  // };

  // getEmployeeRole: API.DigiApi<IRole> = async () => {
  //   const res = await this.request.get(`/bo/employee/role`);
  //   return res;
  // };
}

export default RoleEndpoint
