import {IOptions} from '../types/apis'

import Config, { IConfigOptions } from "../config";
import RequestFactory from "../factories/request";

class BaseExtend {
  config: Config;
  limit: number = 50;
  page: number = 1;
  options: IOptions<any> = {};
  request: RequestFactory;
  constructor(config: Config) {
    this.config = config;
    this.request = new RequestFactory(config, this.options);
  }

  // All() {
  //   const { limit, page } = this;
  //   this.request.get(buildURL("", { limit, page }));
  // }

  Limit(value: number) {
    this.limit = value;
    return this;
  }

  Page(value: number) {
    this.page = value;
    return this;
  }

  Options(options: IOptions<any>) {
    this.options = options;
    return this;
  }
}

export default BaseExtend;
