export {
  getAllProducts,
  getProductByCategoryId,
  getProductById,
  addNewProduct,
  getProductBySKU,
  addNewBundleProduct,
  addProductToQuoteBySku,
  reloadProducts,
  uploadProductImage,
  updateProduct,
  deleteProductById,
  getProductByCategoryPagination,
} from 'apis/bo/common/product/product'
export type {
  IReqAddNewProduct,
  IReqAddProductToQuoteBySku,
  IReqGetProductByCategoryId,
  IResAddProductToQuote,
  IPeriod,
  IReqAddNewBundleProduct,
  IResUploadProductImage,
  IReqUpdateProduct,
  IResGetProducts,
} from 'apis/bo/common/product/productTypes'

export { EPRODUCT_TYPE } from 'apis/bo/common/product/productTypes'
