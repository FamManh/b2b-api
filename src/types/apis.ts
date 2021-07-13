export interface IOptions<T> {
  willCallApi?: () => void
  didCallApi?: () => void
  errorDefaultText?: string
  successDefaultText?: string
  onError?: (message: string, code: number) => void
  onSuccess?: (data: T | null, message: string) => void
  query?: Record<string, string | number>
}

export interface IGet {
  (path: string, AbortSignal?: AbortSignal | null, headers?: Record<string, string>): any
}

export interface IPost {
  (
    path: string,
    data: any,
    AbortSignal?: AbortSignal | null,
    bodyTypeIsForm?: boolean,
    headers?: Record<string, string>,
  ): any
}
export interface IDelete {
  (path: string, data: any, headers?: Record<string, string>): any
}

export interface IResponse<T> {
  data: T
  hasError: boolean
  code: number
  message: string
}

export interface IResRawData {
  message: string | null
  success: boolean
}

export interface IDigiApiArgument<R, P> {
  payload?: P
}

export interface IDigiApi<R, P = any> {
  (arg?: IDigiApiArgument<R, P>): Promise<IResponse<R>>
}

export interface IPage {
  limit: number
  page: number
  total_page: number
  total_record: number
}
