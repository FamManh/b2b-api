import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import { IReqPeriods } from '.'

class PeriodEndpoint extends BaseExtend {
  getPeriods = async (): Promise<IResponse<IReqPeriods[]>> => {
    const res = await this.request.get('/bo/periods')
    return res
  }
}

export default PeriodEndpoint
