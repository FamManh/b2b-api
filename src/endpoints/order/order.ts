import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import { IReqCreateOrder, IResGetOrders, IResOrderDetail } from '.'

class OrderEndpoint extends BaseExtend {
  getOrders = async (): Promise<IResponse<IResGetOrders>> => {
    const res = await this.request.get('/bo/orders')
    return res
  }

  createAnOrder = async (payload: IReqCreateOrder): Promise<IResponse<IResOrderDetail>> => {
    const res = await this.request.post('/bo/orders', payload)

    return res
  }

  getOrderDetail = async (orderId: number): Promise<IResponse<IResOrderDetail>> => {
    const res = await this.request.get(`/bo/detail-order/${orderId}`)

    return res
  }
}

export default OrderEndpoint
