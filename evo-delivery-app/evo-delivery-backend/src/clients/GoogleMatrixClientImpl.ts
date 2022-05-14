import {
  Client,
  DistanceMatrixResponse,
  DistanceMatrixResponseData,
} from '@googlemaps/google-maps-services-js';
import {
  IdWithAddress,
  DistanceMatrix,
  DistanceMatrixColumnData,
  DistanceMatrixRowData,
} from '../types';
import { GoogleMatrixClient } from './GoogleMatrixClient';

export type GoogleMapsClient = Client;
export class GoogleMatrixClientImpl implements GoogleMatrixClient {
  private client;

  constructor(client?: GoogleMapsClient) {
    this.client = client ?? new Client();
  }

  async getDistance(
    originArr: IdWithAddress[],
    destinationArr: IdWithAddress[]
  ): Promise<DistanceMatrix> {
    try {
      const origins = originArr.map((order) => order.address);
      const destinations = destinationArr.map((order) => order.address);
      console.log(origins);
      console.log(destinations);

      const response: DistanceMatrixResponse = await this.client.distancematrix(
        {
          params: {
            origins,
            destinations,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
          timeout: 1000, // milliseconds
        }
      );

      return this.convertToDistanceMatrix(
        response.data,
        originArr,
        destinationArr
      );
    } catch (e) {
      console.error('Failed to fetch distance from Google Matrix API');
      throw e;
    }
  }

  private convertToDistanceMatrix(
    response: DistanceMatrixResponseData,
    originArr: IdWithAddress[],
    destinationArr: IdWithAddress[]
  ): DistanceMatrix {
    if (response.status !== 'OK') throw Error;

    return response.rows.reduce((distanceMatrix, { elements }, i) => {
      const originId = originArr[i].id;

      distanceMatrix[originId] = elements.reduce(
        (distanceObj, { distance, duration, status }, j) => {
          if (status !== 'OK') throw Error;
          const destinationId = destinationArr[j].id;

          distanceObj[destinationId] = {
            distance,
            duration,
          } as DistanceMatrixColumnData;
          return distanceObj;
        },
        {} as DistanceMatrixRowData
      );

      return distanceMatrix;
    }, {} as DistanceMatrix);
  }
}
