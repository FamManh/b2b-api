import Config from "./config";
import RoleEndpoint from "./endpoints/role";
import RequestFactory from "./factories/request";
class B2BSdk {
  config: Config;
  request: RequestFactory;
  role: RoleEndpoint;
  constructor(config: Config) {
    this.config = config;
    this.request = new RequestFactory(config);
    this.role = new RoleEndpoint(config);
  }
}

const gateway = (config: Config) => new B2BSdk(config);

export { gateway };

export default B2BSdk;
