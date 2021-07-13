import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import {
  IReqCreateCustomer,
  IReqCreateEmployee,
  IResCustomer,
  IResCustomers,
  IResEmployee,
  IResEmployees,
} from './customerType'
import { IAddress } from '../user'

class CustomerEndpoint extends BaseExtend {
  // test not success
  syncUsersWithExternalPlatform = async (): Promise<IResponse<string>> => {
    const res = await this.request.get(`/api/fetch-all-user-data`)
    return res
  }

  getCustomerById = async (customerId: string): Promise<IResponse<IResCustomer>> => {
    const res = await this.request.get(`/bo/customer/${customerId}`)
    return res
  }

  getAddressesByCustomerId = async (customerId: string): Promise<IResponse<IAddress[]>> => {
    const res = await this.request.get(`/bo/customer/${customerId}/addresses`)
    return res
  }

  getAllCustomers = async (): Promise<IResponse<IResCustomers>> => {
    const res = await this.request.get(`/bo/customers`)
    return res
  }

  getAllEmployees = async (): Promise<IResponse<IResEmployees>> => {
    const res = await this.request.get(`/bo/employees/`)
    return res
  }

  getCustomersForReAssign = async (): Promise<IResponse<IResCustomer[]>> => {
    const res = await this.request.get(`/bo/list-customer-for-re-assign`)
    return res
  }

  getCustomersByGroup = async (customerGroup: number): Promise<IResponse<IResCustomers>> => {
    const res = await this.request.get(`/bo/customers/group/${customerGroup}`)
    return res
  }

  // test fail
  createACustomer = async (customer: IReqCreateCustomer): Promise<IResponse<IResCustomer>> => {
    const res = await this.request.post(`bo/customer/create`, customer)
    return res
  }

  updateACustomer = async (customer: IReqCreateCustomer): Promise<IResponse<IResCustomer>> => {
    const res = await this.request.put(`bo/customer`, customer)
    return res
  }

  // test fail
  createAnEmployee = async (employee: IReqCreateEmployee): Promise<IResponse<IResEmployee>> => {
    const res = await this.request.post(`bo/employee/create`, employee)
    return res
  }

  updateAnEmployee = async (employee: IReqCreateEmployee): Promise<IResponse<IResEmployee>> => {
    const res = await this.request.put(`bo/employee`, employee)
    return res
  }

  getEmployeeById = async (employeeId: string): Promise<IResponse<IResEmployee>> => {
    const res = await this.request.get(`/bo/employee/${employeeId}`)
    return res
  }
}

export default CustomerEndpoint
