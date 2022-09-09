import 'reflect-metadata';
import 'dotenv/config';
import {Client, DistanceMatrixResponse, DistanceMatrixResponseData,} from '@googlemaps/google-maps-services-js';
import {Geocoder, GoogleMapsProvider, Location} from '@goparrot/geocoder';
import Axios, {AxiosInstance} from 'axios';
import {DistanceMatrix, DistanceMatrixColumnData, DistanceMatrixRowData, Location as EaLocation} from '../types';
import {GoogleMatrixClient} from './GoogleMatrixClient';

import {DistanceMatrixRow, LatLng} from "@googlemaps/google-maps-services-js/dist/common";
import {getPolylineRoute} from "../services/locations.service";

const axios: AxiosInstance = Axios.create();
const apikey = process.env.GOOGLE_MAPS_API_KEY as string
const provider: GoogleMapsProvider = new GoogleMapsProvider(axios, apikey);

export class GoogleMatrixClientImpl implements GoogleMatrixClient {
    private geocodeClient;
    private matrixClient;

    constructor() {
        this.geocodeClient = new Geocoder(provider);
        this.matrixClient = new Client();
    }

    async getPolylineRoute(origin: Partial<EaLocation>, dest: Partial<EaLocation>): Promise<string> {
        try {
            const response = await this.matrixClient.directions({
                params: {
                    origin: [origin.latitude, origin.longitude],
                    destination: [dest.latitude, dest.longitude],
                    key: process.env.GOOGLE_MAPS_API_KEY as string,
                },
                timeout: 1000, // milliseconds
            })

            return response.data.routes[0].overview_polyline.points;
        } catch (e) {
            console.error('Failed to fetch directions from Google Matrix API');
            throw e;
        }
    };

    async getFullLocation(partialLocation: Partial<EaLocation>): Promise<EaLocation> {
        let fullLocation = partialLocation;

        try {
            if (!partialLocation.latitude && !partialLocation.longitude) {
                fullLocation = await this.getLocationByAddress(partialLocation);
            }
            else if (!partialLocation.address) {
                fullLocation = await this.getLocationByLatLng(partialLocation);
            }

            return fullLocation as EaLocation;
        } catch (err) {
            console.error(err);
            throw err
        }
    };

    async getDistance(originsLocations: EaLocation[], destinationsLocations: EaLocation[]): Promise<DistanceMatrix> {
        try {
            const origins = originsLocations.map((order) =>
                [order.latitude, order.longitude] as LatLng);
            const destinations = destinationsLocations.map((order) =>
                [order.latitude, order.longitude] as LatLng);
            
            const distnaceMatrixResponseP = origins.map(async (origin) => {
              const origins = new Array(origin);

              const response: DistanceMatrixResponse =
                await this.matrixClient.distancematrix({
                  params: {
                    origins,
                    destinations,
                    key: process.env.GOOGLE_MAPS_API_KEY as string,
                  },
                  timeout: 1000, // milliseconds
                });

              return response;
            });

            const distnaceMatrixArr = await Promise.all(
              distnaceMatrixResponseP
            );
            distnaceMatrixArr.forEach((matrix) => {
              if (matrix.data.status != "OK") throw Error;
            });

            const mergedDistanceMatrixRow = distnaceMatrixArr.flatMap((a) => a.data.rows);

            return this.convertToDistanceMatrix(
              mergedDistanceMatrixRow,
              originsLocations,
              destinationsLocations
            );
        } catch (e) {
            console.error('Failed to fetch distance from Google Matrix API');
            throw e;
        }
    }

    private convertToDistanceMatrix(
        rows: DistanceMatrixRow[],
        originsLocations: EaLocation[],
        destinationsLocations: EaLocation[]
    ): DistanceMatrix {
        

        return rows.reduce((distanceMatrix, {elements}, i) => {
            const originId = originsLocations[i]._id;

            distanceMatrix[originId] = elements.reduce(
                (distanceObj, {distance, duration, status}, j) => {
                    if (status !== 'OK') throw Error;
                    const destinationId = destinationsLocations[j]._id;

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
    };

    private getLocationByAddress = async (partialLocation: Partial<EaLocation>) => {
        const locations = await this.geocodeClient.geocode({
                address: partialLocation.address as string
            }
        );

        const response = locations[0]

        return {
            _id: partialLocation._id as string,
            address: response.formattedAddress,
            latitude: response.latitude,
            longitude: response.longitude
        } as EaLocation
    };

    private getLocationByLatLng = async (partialLocation: Partial<EaLocation>) => {
        const locations = await this.geocodeClient.reverse({
                lat: partialLocation.latitude as number,
                lon: partialLocation.longitude as number,
            }
        );
        const response = locations[0]

        return {
            _id: partialLocation._id as string,
            address: response.formattedAddress,
            latitude: partialLocation.latitude,
            longitude: partialLocation.longitude
        } as EaLocation
    };
}
