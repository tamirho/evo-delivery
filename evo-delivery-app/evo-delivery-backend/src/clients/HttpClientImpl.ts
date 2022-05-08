import axios from 'axios'
import { HttpClientRequestParameters } from './HttpClient';


export class HttpClientImpl implements HttpClientImpl {

    async get<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
        try {
            const { url, options } = parameters

            const response = await axios.get(url, options);
            return response.data as T;
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }

    async post<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
        try {
            const { url, data, options } = parameters

            const response = await axios.post(url, data, options);
            return response.data as T;
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }

    async put<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
        try {
            const { url, data, options } = parameters

            const response = await axios.put(url, data, options);
            return response.data as T;
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }

    async patch<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
        try {
            const { url, data, options } = parameters

            const response = await axios.patch(url, data, options);
            return response.data as T;
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }

    async delete<T, S>(parameters: HttpClientRequestParameters<S>): Promise<T> {
        try {
            const { url, options } = parameters

            const response = await axios.delete(url, options);
            return response.data as T;
        } catch (error) {
            this.logError(error);
            throw error;
        }
    }

    logError(error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('error message: ', error.message);
        } else {
            console.error('unexpected error: ', error);
        }
    }
}