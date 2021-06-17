export const getDomain = (): string | undefined => process.env.API_ENDPOINT || ''

export const validateDomain = (path: string): void => {
  const isValidDomain = path.split('/').every((item) => item !== 'undefined')
  if (!isValidDomain) throw new Error('Can not detect domain in process.env.API_ENDPOINT')
}

type BuildQueryString = (query?: Record<string, number | string>) => string
export const buildQueryString: BuildQueryString = (query = {}) => {
  const destructQuery = Object.entries(query)
  const joinedKeyValue = destructQuery.map((field) => field.join('=').replace(' ', ''))
  const joinedQueryPairs = joinedKeyValue.join('&')

  if (!joinedQueryPairs.length) return ''
  return `?${joinedQueryPairs}`
}
