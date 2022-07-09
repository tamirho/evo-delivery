import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateResponse,
  EaEvaluateHttpRequestBody,
} from '../types';

export interface EaHttpClient {
  evaluate: (
  requestBody: EaEvaluateHttpRequestBody
  ) => Promise<EaEvaluateResponse>;
  
  getComponentDetails: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;
}



