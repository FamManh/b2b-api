import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import { IResLogin, IReqLogin } from './loginType'

class Login extends BaseExtend {
  doLogin = async (payload: IReqLogin): Promise<IResponse<IResLogin>> => {
    const res = await this.request.post(`bo/login`, payload)
    return res
  }
}

export default Login
