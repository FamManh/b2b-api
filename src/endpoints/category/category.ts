import BaseExtend from "../../extends/base";
import { IDigiApi, IResponse } from "../../types/apis";
import { buildURL } from "../../utils/helpers";

import { ICategory, IReqCategory, IReqUpdateCategory, IResListCategory } from './categoryTypes'


class CategoryEndpoint extends BaseExtend {


	getAllCategories = async (): Promise<IResponse<ICategory[]>> => {
		const res = await this.request.get(`/bo/internal/categories/all`);
		return res;
	};

	getCategoriesPaging = async (): Promise<IResponse<ICategory[]>> => {
		const res = await this.request.get(buildURL(`/bo/internal/categories`, { limit: this.limit, page: this.page }))
		return res;
	};

	getCategoriesByCustomer = async (categoryId: string): Promise<IResponse<ICategory[]>> => {
		const res = await this.request.get(`/bo/internal/categories/${categoryId}`);
		return res;
	};

	getCategoriesEP = async (): Promise<IResponse<IResListCategory>> => {
		const res = await this.request.get(`/bo/fetch/category`);
		return res;
	};

	updateStatusCategory = async (categoryId: string): Promise<IResponse<IResListCategory>> => {
		const res = await this.request.put(`bo/internal/category/update-status/${categoryId}`, null,)
		return res
	};

	createCategory = async (category: IReqCategory): Promise<IResponse<ICategory>> => {
		const res = await this.request.post(`bo/category/create`, category)
		return res
	};

	getCategory = async (categoryId: string): Promise<IResponse<ICategory>> => {
		const res = await this.request.get(`/bo/internal/category/${categoryId}`);
		return res;
	};


	updateCategory = async (category: IReqUpdateCategory): Promise<IResponse<ICategory>> => {
		const res = await this.request.put(`bo/category/update`, category)
		return res
	};

	deleteCategory = async (categoryId: string): Promise<IResponse<null>> => {
		const res = await this.request.del(`bo/category/delete/${categoryId}`, null)
		return res
	};

}
export default CategoryEndpoint;
