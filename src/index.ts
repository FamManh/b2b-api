import Config from "./config";
import RoleEndpoint from "./endpoints/role";
import RequestFactory from "./factories/request";
import CategoryEndpoint from "./endpoints/category";
import CustomerEndpoint from "./endpoints/customer";
import CustomerGroupsEndpoint from "./endpoints/customerGroups";
import File from "./endpoints/file";
import Login from "./endpoints/login";

class B2BSdk {
  config: Config;
  request: RequestFactory;
  role: RoleEndpoint;
  category:CategoryEndpoint;
  customer:CustomerEndpoint;
  customerGroups:CustomerGroupsEndpoint
  file:File
  login:Login
  
  constructor(config: Config) {
    this.config = config;
    this.request = new RequestFactory(config);
    this.role = new RoleEndpoint(config);
    this.category=new CategoryEndpoint(config);
    this.customer=new CustomerEndpoint(config)
    this.customerGroups=new CustomerGroupsEndpoint(config)
    this.file=new File(config);
    this.login=new Login(config)
  }
}

const gateway = (config: Config) => new B2BSdk(config);

export { gateway };

export default B2BSdk;
