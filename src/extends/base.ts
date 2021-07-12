import {IOptions} from '../types/apis'

import Config from "../config";
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

  setLimit(value: number) {
    this.limit = value;
    return this;
  }

  setPage(value: number) {
    this.page = value;
    return this;
  }

  setOptions(options: IOptions<any>) {
    this.options = options;
    this.request = new RequestFactory(this.config, options);
    return this;
  }
}

export default BaseExtend;
