import { EA_ENGINE_BASE_URL } from '../configs';
import { EaClientImpl } from './EaClientImpl';
import { GoogleMatrixClientImpl } from './GoogleMatrixClientImpl';
import { AxiosHttpClient } from './AxiosHttpClient';

export const axiosHttpClient = new AxiosHttpClient();

export const googleMatrixClient = new GoogleMatrixClientImpl();
export const eaClient = new EaClientImpl(axiosHttpClient, EA_ENGINE_BASE_URL);

export * from './HttpClient';
export * from './GoogleMatrixClient';
export * from './EaClient';
