import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'

import {
  IResQuoteDetail,
  IResQuoteData,
  IResUpdateQuoteItems,
  IReqUpdateAQuote,
  IReqRejectAQuote,
  IReqInitializeQuote,
  IReqSetQuoteAssignee,
  IReqUpdateQuoteItems,
  IReqQuoteDetail,
  IResQuoteList,
} from '.'

class Quote extends BaseExtend {
  getAllQuotes = async (): Promise<IResponse<IResQuoteList>> => {
    const res = await this.request.get(`/bo/quotes`)
    return res
  }

  getQuoteByQuoteId = async (payload: IReqQuoteDetail): Promise<IResponse<IResQuoteDetail>> => {
    const res = await this.request.get(`/bo/quote/q/${payload.quoteId}?extType=${payload.extType}`)
    return res
  }

  getQuotesByAssigneeId = async (assigneeId: string): Promise<IResponse<IResQuoteList>> => {
    const res = await this.request.get(`/bo/quotes/assignee/${assigneeId}`)
    return res
  }

  // test success
  updateQuote = async (payload: IReqUpdateAQuote): Promise<IResponse<IResQuoteData>> => {
    const res = await this.request.put(`/bo/update-quote`, payload)
    return res
  }

  // test fail url is wrongs
  updateAQuote = async (payload: IReqUpdateAQuote): Promise<IResponse<IResQuoteData>> => {
    const res = await this.request.put(`bo/quote`, payload)
    return res
  }

  rejectAQuote = async (payload: IReqRejectAQuote): Promise<IResponse<IResQuoteData>> => {
    const res = await this.request.put(`bo/quote`, payload)
    return res
  }

  initializeQuote = async (payload: IReqInitializeQuote): Promise<IResponse<IResQuoteDetail>> => {
    const res = await this.request.post(`bo/quote/initial`, payload)
    return res
  }

  updateAnInitializedQuote = async (
    payload: IReqUpdateAQuote,
  ): Promise<IResponse<IResQuoteData>> => {
    const res = await this.request.put(`bo/quote/initial`, payload)
    return res
  }

  cancelAnInitializedQuote = async (initializeQuoteId: string): Promise<IResponse<null>> => {
    const res = await this.request.del(`bo/quote/initial/cancel/${initializeQuoteId}`, null)
    return res
  }

  setQuoteAssignee = async (quoteAssignee: IReqSetQuoteAssignee): Promise<IResponse<null>> => {
    const res = await this.request.put(`bo/quote/assignee`, quoteAssignee)
    return res
  }

  updateQuoteItems = async (
    quoteItem: IReqUpdateQuoteItems,
  ): Promise<IResponse<IResUpdateQuoteItems>> => {
    const res = await this.request.put(`bo/cart`, quoteItem)
    return res
  }
}

export default Quote
