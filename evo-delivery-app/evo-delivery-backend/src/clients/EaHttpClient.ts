import {
  EaComponentDetails,
  EaComponentTypes,
  EaEvaluateResponse,
  EaEvaluateHttpRequestBody,
} from "../types";

export interface EaHttpClient {
  evaluateWithReturn: (
    requestBody: EaEvaluateHttpRequestBody
  ) => Promise<EaEvaluateResponse>;

  evaluateWithUpdate: (requestBody: EaEvaluateHttpRequestBody) => Promise<void>;

  getComponentDetails: (
    componentType: EaComponentTypes
  ) => Promise<EaComponentDetails[]>;

  terminate: (runId: string) => Promise<void>;
}
