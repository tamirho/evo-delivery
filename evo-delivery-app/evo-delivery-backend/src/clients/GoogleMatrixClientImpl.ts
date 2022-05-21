import {Client, DistanceMatrixResponse, DistanceMatrixResponseData,} from '@googlemaps/google-maps-services-js';
import {DistanceMatrix, DistanceMatrixColumnData, DistanceMatrixRowData, Location,} from '../types';
import {GoogleMatrixClient} from './GoogleMatrixClient';

export type GoogleMapsClient = Client;
export class GoogleMatrixClientImpl implements GoogleMatrixClient {
  private client;

  constructor(client?: GoogleMapsClient) {
    this.client = client ?? new Client();
  }

  async getDistance(
    originsLocations: Location[],
    destinationsLocations: Location[]
  ): Promise<DistanceMatrix> {
    try {
      const origins = originsLocations.map((order) => order.address);
      const destinations = destinationsLocations.map((order) => order.address);
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
        originsLocations,
        destinationsLocations
      );
    } catch (e) {
      console.error('Failed to fetch distance from Google Matrix API');
      throw e;
    }
  }

  private convertToDistanceMatrix(
    response: DistanceMatrixResponseData,
    originsLocations: Location[],
    destinationsLocations: Location[]
  ): DistanceMatrix {
    if (response.status !== 'OK') throw Error;

    return response.rows.reduce((distanceMatrix, { elements }, i) => {
      const originId = originsLocations[i].id;

      distanceMatrix[originId] = elements.reduce(
        (distanceObj, { distance, duration, status }, j) => {
          if (status !== 'OK') throw Error;
          const destinationId = destinationsLocations[j].id;

          distanceObj[destinationId] = {
            distance: {text: distance.text, value: GoogleMatrixClientImpl.normalizeValue(distance.value)},
            duration,
          } as DistanceMatrixColumnData;
          return distanceObj;
        },
        {} as DistanceMatrixRowData
      );

      return distanceMatrix;
    }, {} as DistanceMatrix);
  }

    private static normalizeValue(value: number) {
      const ThousandMeters = 1000;
      return value / ThousandMeters;
    }
}
