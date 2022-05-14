import { EA_ENGINE_LOCAL_BASE_URL } from '../configs';
import { EaClientImpl } from './EaClientImpl';
import { GoogleMatrixClientImpl } from './GoogleMatrixClientImpl';
import { AxiosHttpClient } from './AxiosHttpClient';
import { EaHttpConverterImpl } from './utils/EaHttpConverter';

export const axiosHttpClient = new AxiosHttpClient();

export const googleMatrixClient = new GoogleMatrixClientImpl();

const eaHttpConverter = new EaHttpConverterImpl();
export const eaClient = new EaClientImpl(
  axiosHttpClient,
  eaHttpConverter,
  EA_ENGINE_LOCAL_BASE_URL
);

export * from './HttpClient';
export * from './GoogleMatrixClient';
export * from './EaClient';
