import { EA_ENGINE_LOCAL_BASE_URL } from '../configs';
import { EaHttpClientImpl } from './EaHttpClientImpl';
import { GoogleMatrixClientImpl } from './GoogleMatrixClientImpl';
import { AxiosHttpClient } from './AxiosHttpClient';
import { EaHttpConverterImpl } from './utils/EaHttpConverter';
import {EaHttpClientAdapterImpl} from "./EaHttpClientAdapterImpl";

export const axiosHttpClient = new AxiosHttpClient();

const eaHttpConverter = new EaHttpConverterImpl();
const eaClient = new EaHttpClientImpl(
    axiosHttpClient,
    EA_ENGINE_LOCAL_BASE_URL
);

export const googleMatrixClient = new GoogleMatrixClientImpl();
export const eaHttpClientAdapter = new EaHttpClientAdapterImpl(eaClient, eaHttpConverter);

export * from './HttpClient';
export * from './GoogleMatrixClient';
export * from './EaHttpClient';
