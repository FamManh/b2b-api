import fetch from "node-fetch";
import Config from "../config";
import { IResponse, IOptions, IGet, IPost, IDelete } from "../types/apis";

const JSON_HEADERS = {
  Accept: "application/json",
  Cache: "no-cache",
};
const DEFAULT_AUTH_HEADER = { "Content-Type": "application/json" };
const DEFAULT_ERROR_DATA = {
  data: null,
  hasError: true,
  // hard code
  code: 404,
};

const apiProcessor = async (
  promise: Promise<any>,
  options?: IOptions<any>
): Promise<IResponse<any>> => {
  // will call api
  options?.willCallApi && options.willCallApi();
  const calculatedResponse = await calculateResponse(promise);
  options?.didCallApi && options.didCallApi();

  const { data, message, hasError, code } = calculatedResponse;

  if (hasError) {
    options?.onError && options?.onError(message, code);
    throw new Error();
  }
  // did call api
  options?.onSuccess && options.onSuccess(data, message);
  return { data, message, hasError, code };
};

const calculateResponse = async (
  promise: Promise<Response>
): Promise<IResponse<any>> => {
  let code = 200;
  let message = "";
  let hasError = false;
  let data = null;

  const response = await promise;
  const parsedResponse = await response.json();
  code = response.status;

  if (isNewStructureDetector(parsedResponse)) {
    data = parsedResponse.data;
    message = parsedResponse.message ?? message;
    hasError = !parsedResponse.success;
  } else {
    data = parsedResponse;
  }

  return { data, message, hasError: hasError || !response.ok, code };
};

const isNewStructureDetector = (response: Record<string, string>): boolean => {
  const newResponseFields = ["data", "success", "message"];
  const isNewStructure =
    typeof response === "object" &&
    newResponseFields.every((field) => field in response);
  return isNewStructure;
};

class RequestFactory {
  config: Config;
  options: IOptions<any> = {};
  constructor(config: Config, options?: IOptions<any>) {
    this.config = config;
    this.options = options || {};
  }

  get: IGet = async (path, signal = null, headers = DEFAULT_AUTH_HEADER) => {

    try {
      const builtPath = `${this.config.protocol}://${this.config.host}${path}`;
      console.log(builtPath);

      const whenResponse = fetch(builtPath, {
        method: "GET",
        headers: {
          ...JSON_HEADERS,
          ...headers,
          Authorization: this.config.token || "",
        },
        // credentials: "same-origin",
        signal,
      });

      const { data, hasError, code, message } = await apiProcessor(
        whenResponse,
        this.options
      );

      return {
        data,
        hasError,
        code,
        message: message || this.options?.successDefaultText || "Successfully",
      };
    } catch (error) {
      this.config.nodeEnv === "development" && console.log(error);
      return {
        ...DEFAULT_ERROR_DATA,
        message: this.options?.errorDefaultText || "Something went wrong",
      };
    }
  };

  post: IPost = async (
    path,
    body,
    signal = null,
    bodyTypeIsForm = false,
    headers = DEFAULT_AUTH_HEADER
  ) => {
    const customHeaders = !bodyTypeIsForm
      ? { ...JSON_HEADERS, ...headers, Authorization: this.config.token || "" }
      : {
          ...JSON_HEADERS,
          Authorization: this.config.token || "",
        };

    try {
      const builtPath = `${this.config.protocol}://${this.config.host}${path}`;

      const whenResponse = fetch(builtPath, {
        method: "POST",
        headers: {
          ...customHeaders,
        },
        body: !bodyTypeIsForm ? JSON.stringify(body) : body,
        // credentials: "same-origin",
        signal,
      });

      const { data, hasError, code, message } = await apiProcessor(
        whenResponse,
        this.options
      );

      return {
        data,
        hasError,
        code,
        message: message || this.options?.successDefaultText || "Successfully",
      };
    } catch (error) {
      this.config.nodeEnv === "development" && console.log(error);
      return {
        ...DEFAULT_ERROR_DATA,
        message: this.options?.errorDefaultText || "Something went wrong",
      };
    }
  };

  put: IPost = async (
    path,
    body,
    signal = null,
    _,
    headers = DEFAULT_AUTH_HEADER
  ) => {
    try {
      const builtPath = `${this.config.protocol}://${this.config.host}${path}`;

      const whenResponse = fetch(builtPath, {
        method: "PUT",
        headers: {
          ...JSON_HEADERS,
          ...headers,
          Authorization: this.config.token || "",
        },
        body: JSON.stringify(body),        
        // credentials: "same-origin",
        signal,
      });

      const { data, hasError, code, message } = await apiProcessor(
        whenResponse,
        this.options
      );

      return {
        data,
        hasError,
        code,
        message: message || this.options?.successDefaultText || "Successfully",
      };
    } catch (error) {
      this.config.nodeEnv === "development" && console.log(error);
      return {
        ...DEFAULT_ERROR_DATA,
        message: this.options?.errorDefaultText || "Something went wrong",
      };
    }
  };

  del: IDelete = async (path, body, options, headers = DEFAULT_AUTH_HEADER) => {
    try {
      const builtPath = `${this.config.protocol}://${this.config.host}${path}`;

      const whenResponse = fetch(builtPath, {
        method: "DELETE",
        headers: {
          // ...JSON_HEADERS,
          ...headers,
          Authorization: this.config.token || "",
        },
        body: body ? JSON.stringify(body) : "",
        // credentials: "same-origin",
      });

      const { data, hasError, code, message } = await apiProcessor(
        whenResponse,
        options
      );

      return {
        data,
        hasError,
        code,
        message: message || options?.successDefaultText || "Successfully",
      };
    } catch (error) {
      this.config.nodeEnv === "development" && console.log(error);
      return {
        ...DEFAULT_ERROR_DATA,
        message: options?.errorDefaultText || "Something went wrong",
      };
    }
  };
}

export default RequestFactory;
