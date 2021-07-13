import BaseExtend from '../../extends/base'
import { IDigiApi } from '../../types/apis'
import { IReqPeriods } from './periodTypes'

class PeriodEndpoint extends BaseExtend {
  getPeriods: IDigiApi<IReqPeriods[]> = async () => {
    const res = await this.request.get('/bo/periods')
    return res
  }
}

export default PeriodEndpoint
