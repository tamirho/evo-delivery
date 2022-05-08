import { EA_ENGINE_BASE_URL } from '../configs';
import { EaClientImpl } from './EaClientImpl';
import { GoogleMatrixClientImpl } from './GoogleMatrixClientImpl';
import { HttpClientImpl } from './HttpClientImpl';

export const httpClient = new HttpClientImpl();
export const googleMatrixClient = new GoogleMatrixClientImpl();
export const eaClient = new EaClientImpl(httpClient, EA_ENGINE_BASE_URL);

export * from './HttpClient';
export * from './GoogleMatrixClient';
export * from './EaClient';