import BaseExtend from '../../extends/base'
import { IResponse } from '../../types/apis'
import { IResUploadFile } from '.'
class File extends BaseExtend {
  uploadFile = async (formData: FormData): Promise<IResponse<IResUploadFile>> => {
    const res = await this.request.post(`/file/save`, formData, undefined, true)
    return res
  }
}

export default File
