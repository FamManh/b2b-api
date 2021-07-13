import Config from "./config";
import RoleEndpoint from "./endpoints/role";
import RequestFactory from "./factories/request";
import CategoryEndpoint from "./endpoints/category";
import CustomerEndpoint from "./endpoints/customer";
class B2BSdk {
  config: Config;
  request: RequestFactory;
  role: RoleEndpoint;
  category:CategoryEndpoint;
  customer:CustomerEndpoint;
  constructor(config: Config) {
    this.config = config;
    this.request = new RequestFactory(config);
    this.role = new RoleEndpoint(config);
    this.category=new CategoryEndpoint(config);
    this.customer=new CustomerEndpoint(config)
  }
}

const gateway = (config: Config) => new B2BSdk(config);

export { gateway };

export default B2BSdk;
