import BaseExtend from "../../extends/base";
import { IDigiApi } from "../../types/apis";
import { buildURL } from "../../utils/helpers";

import {ICategory, IReqCategory, IReqUpdateCategory, IResListCategory } from './categoryTypes'


class CategoryEndpoint extends BaseExtend {


	getAllCategories: IDigiApi<ICategory[], null> = async () => {
    const res = await this.request.get(`/bo/internal/categories/all`);
    return res;
  };
	
	getCategoriesPaging: IDigiApi<IResListCategory, null[]> = async () => {
    const res = await this.request.get( buildURL(`/bo/internal/categories`, { limit: this.limit, page: this.page }))
    return res;
  };
	
	getCategoriesByCustomer: IDigiApi<ICategory[], string> = async (args) => {
    const res = await this.request.get(`/bo/internal/categories/${args?.payload}`);
    return res;
  };
	
	getCategoriesEP: IDigiApi<IResListCategory, null> = async () => {
    const res = await this.request.get(`/bo/fetch/category`);
    return res;
  };
	
	updateStatusCategory: IDigiApi<null, string> = async (args) => {
   const res = await this.request.put(`bo/internal/category/update-status/${args?.payload}`,null,)
  return res
  };

	createCategory: IDigiApi<ICategory, IReqCategory> = async (args) => {
		const res = await this.request.post(`bo/category/create`,args?.payload)
	 return res
	 };
 
	 getCategory: IDigiApi<ICategory, string> = async (args) => {
    const res = await this.request.get(`/bo/internal/category/${args?.payload}`);
    return res;
  };
	
	
	updateCategory: IDigiApi<ICategory, IReqUpdateCategory> = async (args) => {
		const res = await this.request.put(`bo/category/update`,args?.payload)
	 return res
	 };
	 
	 deleteCategory: IDigiApi<null, string> = async (args) => {
		const res = await this.request.del(`bo/category/delete/${args?.payload}`,null)
	 return res
	 };
	
}
export default CategoryEndpoint;
