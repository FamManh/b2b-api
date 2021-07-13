import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import {
  IReqCreatePriceBook,
  IReqUpdateAllDiscountPrice,
  IReqUpdatePriceBook,
  IReqUpdatePriceBookPrices,
  IResCreatePriceBook,
  IResGetPriceBooks,
  IResGetProductByPriceBook,
  IResPriceBook,
  IResUpdatePriceBookPrices,
} from '.'

class PriceBookEndpoint extends BaseExtend {
  getPriceBooks = async (): Promise<IResponse<IResGetPriceBooks>> => {
    const res = await this.request.get('/bo/price-list')
    return res
  }

  getAllPriceBooks = async (): Promise<IResponse<IResPriceBook[]>> => {
    const res = await this.request.get('/bo/price-list/all')
    return res
  }

  getPriceBook = async (priceBookId: number): Promise<IResponse<IResPriceBook>> => {
    const res = await this.request.get(`/bo/price-list/${priceBookId}`)
    return res
  }

  deletePriceBook = async (priceBookId: number): Promise<IResponse<IResPriceBook>> => {
    const res = await this.request.del(`/bo/price-list/${priceBookId}`, null)
    return res
  }

  createPriceBook = async (
    payload: IReqCreatePriceBook,
  ): Promise<IResponse<IResCreatePriceBook>> => {
    const res = await this.request.post('/bo/price-list', payload)
    return res
  }

  updatePriceBookInfo = async (payload: IReqUpdatePriceBook): Promise<IResponse<IResPriceBook>> => {
    const res = await this.request.post(`/bo/price-list/add-group`, payload)
    return res
  }

  updatePriceBookPrices = async (
    payload: IReqUpdatePriceBookPrices,
  ): Promise<IResponse<IResUpdatePriceBookPrices>> => {
    const res = await this.request.post(`/bo/add-product-prices`, payload)
    return res
  }

  getProductsByPriceBook = async (
    priceBookId: number,
  ): Promise<IResponse<IResGetProductByPriceBook>> => {
    const res = await this.request.get(`/bo/products/${priceBookId}`)
    return res
  }

  updateAllProductsDiscountPrice = async (
    payload: IReqUpdateAllDiscountPrice,
  ): Promise<IResponse<boolean>> => {
    const res = await this.request.post('/bo/add-all-product-price', payload)
    return res
  }
}

export default PriceBookEndpoint
