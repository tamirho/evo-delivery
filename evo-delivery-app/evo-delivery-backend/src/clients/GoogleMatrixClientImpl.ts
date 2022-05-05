import {Client, DistanceMatrixResponse, DistanceMatrixResponseData} from "@googlemaps/google-maps-services-js";
import {Order, DistanceMatrix, DistanceMatrixColumnData, DistanceMatrixRowData} from "../types";
import {GoogleMatrixClient} from "./GoogleMatrixClient";

export class GoogleMatrixClientImpl implements GoogleMatrixClient {
    private client;

    constructor() {
        this.client = new Client();
    }

    async getDistance(originArr: Order[], destinationArr: Order[]): Promise<DistanceMatrix> {
        try {
            const origins = originArr.map(order => order.shippingAddress)
            const destinations = destinationArr.map(order => order.shippingAddress)

            const response: DistanceMatrixResponse = await this.client.distancematrix({
                params: {
                    origins,
                    destinations,
                    key: process.env.GOOGLE_MAPS_API_KEY
                },
                timeout: 1000 // milliseconds
            })

            return this.parseResponse(response.data, originArr, destinationArr)

        } catch (e) {
            console.error("Failed to fetch distance from Google Matrix API");
            throw e;
        }
    }

    private parseResponse(response: DistanceMatrixResponseData, originArr: Order[], destinationArr: Order[]): DistanceMatrix {
        if (response.status !== 'OK') throw Error

        return response.rows.reduce((distanceMatrix, {elements}, i) => {
            const originId = originArr[i].id

            distanceMatrix[originId] = elements.reduce((distanceObj, {distance, duration, status}, j) => {
                if (status !== 'OK') throw Error
                const destinationId = destinationArr[j].id

                distanceObj[destinationId] = {distance, duration} as DistanceMatrixColumnData
                return distanceObj
            }, {} as DistanceMatrixRowData);

            return distanceMatrix
        }, {} as DistanceMatrix);
    }
}

