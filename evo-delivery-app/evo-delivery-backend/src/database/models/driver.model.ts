import mongoose, {Schema} from "mongoose";
import {Driver} from "../../types/driver.type";

export type MDriver = {
    _id: string;
    name: string;
    maxCapacity: number;
    maxDistance: number;
    createdAt: Date;
    updatedAt: Date;
};


const driverSchema = new Schema<MDriver>({
        name: {
            type: String,
            required: true
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        maxDistance: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: 'Drivers'
    })

export default mongoose.model<MDriver>('Driver', driverSchema);