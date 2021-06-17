import { buildQueryString, validateDomain } from './utils'

const JSON_HEADERS = {
  Accept: 'application/json',
  // @disable cache field for contentful api integration
  // Cache: 'no-cache',
}

const getToken = (): string => {
  let accessToken = ''
  if (typeof window !== undefined) {
    if (typeof window !== undefined) {
      accessToken =
        JSON.parse(window?.localStorage?.getItem('B2B_EP_TOKEN') ?? '{}')?.token?.toString() ?? ''
    }
  }
  return accessToken
}

const DEFAULT_AUTH_HEADER = {
  'Content-Type': 'application/json',
  // Authorization: accessToken
}
const DEFAULT_ERROR_DATA = {
  data: null,
  hasError: true,
  // hard code
  code: 404,
}
const isInDevelopment = false

const apiProcessor = async (
  promise: Promise<any>,
  options?: API.Options<any>,
): Promise<API.Response<any>> => {
  // will call api
  options?.willCallApi && options.willCallApi()
  const calculatedResponse = await calculateResponse(promise)
  options?.didCallApi && options.didCallApi()

  const { data, message, hasError, code } = calculatedResponse

  if (hasError) {
    options?.onError && options?.onError(message, code)
    throw new Error()
  }
  // did call api
  options?.onSuccess && options.onSuccess(data, message)
  return { data, message, hasError, code }
}

const calculateResponse = async (promise: Promise<Response>): Promise<API.Response<any>> => {
  let code = 200
  let message = ''
  let hasError = false
  let data = null

  const response = await promise
  const parsedResponse = await response.json()
  code = response.status

  if (isNewStructureDetector(parsedResponse)) {
    data = parsedResponse.data
    message = parsedResponse.message ?? message
    hasError = !parsedResponse.success
  } else {
    data = parsedResponse
  }

  return { data, message, hasError: hasError || !response.ok, code }
}

const isNewStructureDetector = (response: Record<string, string>): boolean => {
  const newResponseFields = ['data', 'success', 'message']
  const isNewStructure =
    typeof response === 'object' && newResponseFields.every((field) => field in response)
  return isNewStructure
}

const buildPath = (path: string, queryObj?: Record<string, string | number>) => {
  if (!queryObj) return path
  return `${path}${buildQueryString(queryObj)}`
}

export const get: API.Get = async (path, options, signal=null, headers = DEFAULT_AUTH_HEADER) => {
  try {
    validateDomain(path)
    const builtPath = buildPath(path, options?.query)
    const whenResponse = fetch(builtPath, {
      method: 'GET',
      headers: {
        Authorization: getToken(),
        ...JSON_HEADERS,
        ...headers,
      },
      // headers: new Headers({
      //   ...JSON_HEADERS,
      //   Authorization: `Bearer ${token}`,
      // }),
      credentials: 'same-origin',
      signal,
    })

    const { data, hasError, code, message } = await apiProcessor(whenResponse, options)

    return {
      data,
      hasError,
      code,
      message: message || options?.successDefaultText || 'Successfully',
    }
  } catch (error) {
    isInDevelopment && console.log(error)
    return {
      ...DEFAULT_ERROR_DATA,
      message: options?.errorDefaultText || 'Something went wrong',
    }
  }
}

export const post: API.Post = async (
  path,
  body,
  options,
  signal=null,
  bodyTypeIsForm = false,
  headers = DEFAULT_AUTH_HEADER,
) => {
  const customHeaders = !bodyTypeIsForm
    ? {
        Authorization: getToken(),
        ...JSON_HEADERS,
        ...headers,
      }
    : {
        Authorization: getToken(),
        ...JSON_HEADERS,
      }

  try {
    validateDomain(path)
    const builtPath = buildPath(path, options?.query)

    const whenResponse = fetch(builtPath, {
      method: 'POST',
      headers: {
        ...customHeaders,
      },
      body: !bodyTypeIsForm ? JSON.stringify(body) : body,
      credentials: 'same-origin',
      signal,
    })

    const { data, hasError, code, message } = await apiProcessor(whenResponse, options)

    return {
      data,
      hasError,
      code,
      message: message || options?.successDefaultText || 'Successfully',
    }
  } catch (error) {
    isInDevelopment && console.log(error)
    return {
      ...DEFAULT_ERROR_DATA,
      message: options?.errorDefaultText || 'Something went wrong',
    }
  }
}

export const put: API.Post = async (
  path,
  body,
  options,
  signal=null,
  _,
  headers = DEFAULT_AUTH_HEADER,
) => {
  try {
    validateDomain(path)
    const builtPath = buildPath(path, options?.query)

    const whenResponse = fetch(builtPath, {
      method: 'PUT',
      headers: {
        Authorization: getToken(),
        ...JSON_HEADERS,
        ...headers,
      },
      body: JSON.stringify(body),
      credentials: 'same-origin',
      signal,
    })

    const { data, hasError, code, message } = await apiProcessor(whenResponse, options)

    return {
      data,
      hasError,
      code,
      message: message || options?.successDefaultText || 'Successfully',
    }
  } catch (error) {
    isInDevelopment && console.log(error)
    return {
      ...DEFAULT_ERROR_DATA,
      message: options?.errorDefaultText || 'Something went wrong',
    }
  }
}

export const del: API.Delete = async (path, body, options, headers = DEFAULT_AUTH_HEADER) => {
  try {
    validateDomain(path)
    const builtPath = buildPath(path, options?.query)

    const whenResponse = fetch(builtPath, {
      method: 'DELETE',
      headers: {
        // ...JSON_HEADERS,
        Authorization: getToken(),
        ...headers,
      },
      body: body ? JSON.stringify(body) : '',
      credentials: 'same-origin',
    })

    const { data, hasError, code, message } = await apiProcessor(whenResponse, options)

    return {
      data,
      hasError,
      code,
      message: message || options?.successDefaultText || 'Successfully',
    }
  } catch (error) {
    isInDevelopment && console.log(error)
    return {
      ...DEFAULT_ERROR_DATA,
      message: options?.errorDefaultText || 'Something went wrong',
    }
  }
}

export default {
  get,
  post,
  put,
  del,
}
