import axios, { AxiosRequestConfig } from 'axios';
import isFunction from 'lodash/isFunction';

class Request {
    config: AxiosRequestConfig;

    constructor (config: AxiosRequestConfig = {}) {
      this.config = config;
    }

    /**
     * Make new GET request in shorter format base on Axios
     * @param {String}      url
     * @param {Object}      params
     * @param {Function}    onCallback
     * @param {Function}    onError
     * @param {Function}    onFinally
     */
    static async make (url: string, config?: AxiosRequestConfig, onCallback?: Function, onError?: Function, onFinally?: Function): Promise<void> {
      const { method = 'GET', headers, ...restConfig } = config;
      try {
        const res = await axios.request({
          ...restConfig,
          headers: {
            Accept: 'application/json',
            ...headers
          },
          url,
          method
        });
        if (isFunction(onCallback)) {
          onCallback(res);
        }
      } catch (error) {
        if (isFunction(onError)) {
          onError(error);
        }
      }
      if (isFunction(onFinally)) {
        onFinally();
      }
    }
}

export default Request;
