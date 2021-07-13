export interface IConfigOptions {
  host: string
  protocol: string
  nodeEnv?: 'production' | 'development'
  token?: string
  language?: string
  currency?: string
  headers?: { [key: string]: string }
}

class Config {
  readonly protocol: string
  readonly host: string
  readonly token?: string = ''
  readonly nodeEnv?: string = 'production'
  readonly currency?: string
  readonly language?: string
  readonly headers?: { [key: string]: string }
  constructor(options: IConfigOptions) {
    const { currency, headers, host, language, token, protocol, nodeEnv } = options
    this.token = token || ''
    this.host = host || ''
    this.nodeEnv = nodeEnv || ''
    this.protocol = protocol || ''
    this.currency = currency || ''
    this.language = language || ''
    this.headers = headers || {}
  }
}

export default Config
