import BaseExtend from '../../extends/base'
import { IDigiApi, IResponse } from '../../types/apis'
import {
  IReqAddNewProduct,
  IReqAddNewBundleProduct,
  IReqAddProductToQuoteBySku,
  IResAddProductToQuote,
  IResUploadProductImage,
  IReqUpdateProduct,
  IResGetProducts,
  IReqGetProductByCategoryId,
  IProduct,
  IProductInCart,
} from '.'

class ProductEndpoint extends BaseExtend {
  getAllProducts: IDigiApi<IResGetProducts> = async () => {
    const res = await this.request.get('/bo/products')
    return res
  }

  reloadProducts: IDigiApi<null> = async () => {
    const res = await this.request.get('/bo/fetch-products')
    return res
  }

  addNewProduct = async (payload: IReqAddNewProduct): Promise<IResponse<IProduct>> => {
    const res = await this.request.post('/bo/product/add', payload)
    return res
  }

  addNewBundleProduct = async (payload: IReqAddNewBundleProduct): Promise<IResponse<IProduct>> => {
    const res = await this.request.post('/bo/product/bundle', payload)
    return res
  }

  updateProduct = async (payload: IReqUpdateProduct): Promise<IResponse<IProduct>> => {
    const res = await this.request.put(`/bo/product/${payload.id}`, payload)
    return res
  }

  getProductById = async (productId: number | string): Promise<IResponse<IProduct>> => {
    const res = await this.request.get(`/bo/get-product-by-id/${productId}`)
    return res
  }

  getProductByCategoryId = async (
    payload: IReqGetProductByCategoryId,
  ): Promise<IResponse<IProductInCart[]>> => {
    const { customer_id, category_id } = payload
    const res = await this.request.post(`/bo/category/${category_id}`, { customer_id })
    return res
  }

  getProductBySKU = async (productId: string): Promise<IResponse<IProduct>> => {
    const res = await this.request.get(`/bo/product/sku/${productId}`)
    return res
  }

  addProductToQuoteBySku = async (
    payload: IReqAddProductToQuoteBySku,
  ): Promise<IResponse<IResAddProductToQuote>> => {
    const { sku, ...resPayload } = payload
    const res = await this.request.post(`/bo/product/sku/${sku}`, resPayload)
    return res
  }

  uploadProductImage = async (payload: FormData): Promise<IResponse<IResUploadProductImage>> => {
    const res = await this.request.post(`/bo/product/file`, payload, undefined, true)
    return res
  }

  deleteProductById = async (productId: string): Promise<IResponse<boolean>> => {
    const res = await this.request.del(`/bo/product/${productId}`, null)
    return res
  }

  getProductByCategoryPagination = async (
    categoryId: number,
  ): Promise<IResponse<IResUploadProductImage>> => {
    const res = await this.request.get(`/bo/category/${categoryId}`)
    return res
  }
}
export default ProductEndpoint
