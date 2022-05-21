import axios from 'axios';
import { HttpClient, HttpClientRequestParameters } from './HttpClient';

export class AxiosHttpClient implements HttpClient {
  private logger: any;

  constructor(logger: any = console) {
    this.logger = logger;

    this.setHttpLogsOn();
  }

  async get<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
    try {
      const { url, options } = parameters;

      const response = await axios.get(url, options);
      return response.data as T;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async post<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
    try {
      const { url, data, options } = parameters;

      const response = await axios.post(url, data, options);
      return response.data as T;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async put<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
    try {
      const { url, data, options } = parameters;

      const response = await axios.put(url, data, options);
      return response.data as T;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async patch<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
    try {
      const { url, data, options } = parameters;

      const response = await axios.patch(url, data, options);
      return response.data as T;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  async delete<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
    try {
      const { url, options } = parameters;

      const response = await axios.delete(url, options);
      return response.data as T;
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }

  logError(error: unknown) {
    if (axios.isAxiosError(error)) {
      this.logger.error('error message: ', error.message);
    } else {
      this.logger.error('unexpected error: ', error);
    }
  }

  setHttpLogsOn() {
    if (!process.env.HTTP_CALLS_DEBUG) {
      return;
    }

    axios.interceptors.request.use((x: any) => {
      const headers = {
        ...x.headers.common,
        ...x.headers[x.method],
        ...x.headers,
      };

      ['common', 'get', 'post', 'head', 'put', 'patch', 'delete'].forEach(
        (header) => {
          delete headers[header];
        }
      );

      const printable = `${new Date()} | Request: ${x.method.toUpperCase()} | ${
        x.url
      } 
      Params: ${JSON.stringify(x.params)}
      Headers: ${JSON.stringify(headers)}
      Data: ${JSON.stringify(x.data)}`;

      this.logger.log(printable);

      return x;
    });

    axios.interceptors.response.use((x) => {
      const printable = `${new Date()} | Response: ${x.status}
      Data: ${JSON.stringify(x.data)}`;

      this.logger.log(printable);

      return x;
    });
  }
}
