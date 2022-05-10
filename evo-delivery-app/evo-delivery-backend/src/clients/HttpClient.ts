export interface HttpClientRequestParameters<S> {
  url: string;
  data?: S;
  options?: any;
}

export interface HttpClient {
  get<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T>;
  post<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T>;
  put<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T>;
  patch<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T>;
  delete<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T>;
}
