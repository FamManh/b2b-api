import BaseExtend from "../../extends/base";
import { IDigiApi, IResponse } from "../../types/apis";
import { IReqCreateOrder, IResGetOrders, IResOrderDetail } from "./orderTypes";

class OrderEndpoint extends BaseExtend {
  getOrders: IDigiApi<IResGetOrders> = async () => {
    const res = await this.request.get('/bo/orders');
    return res
  }
  
  createAnOrder = async (payload: IReqCreateOrder): Promise<IResponse<IResOrderDetail>> => {
    const res = await this.request.post('/bo/orders', payload)
  
    return res
  }
  
  getOrderDetail = async (orderId: number): Promise<IResponse<IResOrderDetail>>  => {
    const res = await this.request.get(`/bo/detail-order/${orderId}`)
  
    return res
  } 
}

export default OrderEndpoint;