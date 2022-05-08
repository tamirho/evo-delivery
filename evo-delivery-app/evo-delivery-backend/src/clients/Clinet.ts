// import { HttpClient } from './HttpClient';

// export class Client {
//     private readonly httpClient: HttpClient;
//     private readonly baseUrl: string;
  
//     constructor(httpClient: HttpClient, baseUrl: string) {
//       this.httpClient = httpClient;
//       this.baseUrl = baseUrl;
//     }
  
//     get<T = any>(
//         parameters
//     ): Promise<HttpResponse<T>> {
//         const { url, options } = parameters
 
//       return this.httpClient.get<T>(`${this.baseUrl}${url}`, options);
//     }
  
//     post<T = any>(
//       url: string,
//       data?: any,
//       requestOptions?: RequestOptions<T>,
//     ): Promise<HttpResponse<T>> {
//       return this.httpClient.post<T>(
//         `${this.baseUrl}${url}`,
//         data,
//         requestOptions,
//       );
//     }
//     patch<T = any>(
//       url: string,
//       data?: any,
//       requestOptions?: RequestOptions<T>,
//     ): Promise<HttpResponse<T>> {
//       return this.httpClient.patch<T>(
//         `${this.baseUrl}${url}`,
//         data,
//         requestOptions,
//       );
//     }
//     put<T = any>(
//       url: string,
//       data?: any,
//       requestOptions?: RequestOptions<T>,
//     ): Promise<HttpResponse<T>> {
//       return this.httpClient.put<T>(
//         `${this.baseUrl}${url}`,
//         data,
//         requestOptions,
//       );
//     }
//     delete<T = any>(
//       url: string,
//       requestOptions?: RequestOptions<T>,
//     ): Promise<HttpResponse<T>> {
//       return this.httpClient.delete<T>(`${this.baseUrl}${url}`, requestOptions);
//     }
//   }
  