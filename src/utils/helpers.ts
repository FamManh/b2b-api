interface IParams {
  limit: number
  page: number
}

function formatQueryString(key: string, value: string) {
  return `${key}=${value}`
}

function buildQueryParams({ page, limit }: Partial<IParams>) {
  const query: { [key: string]: string } = {}

  if (limit) {
    query.limit = `${limit}`
  }

  if (page) {
    query.page = `${page}`
  }

  return Object.keys(query)
    .map((k) => formatQueryString(k, query[k]))
    .join('&')
}

export function buildURL(endpoint: string, params: Partial<IParams>): string {
  if (params.page || params.limit) {
    const paramsString = buildQueryParams(params)

    return `${endpoint}?${paramsString}`
  }

  return endpoint
}

interface IParseJSON {
  status: number
  ok: boolean
  json: any
}

export function parseJSON(response: Response): Promise<IParseJSON> {
  return new Promise((resolve) => {
    response.text().then((body: string) => {
      resolve({
        status: response.status,
        ok: response.ok,
        json: body !== '' ? JSON.parse(body) : '{}',
      })
    })
  })
}
