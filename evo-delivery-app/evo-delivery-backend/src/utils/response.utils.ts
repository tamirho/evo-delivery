import { JsonResponse } from '../types';

const errorCodeToMsgMap = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

export const OK = (data?: any, status = 200, message = 'OK'): JsonResponse => ({
  status,
  ...(data ? { data } : {}),
  message,
});

export const INVALID = (status = 400, message?: string): JsonResponse => ({
  status,
  message: message ? message : errorCodeToMsgMap[status],
});
