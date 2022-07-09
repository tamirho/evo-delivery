import mongoose, {Schema} from "mongoose";
import {Driver} from "../../types/driver.type";

const driverSchema = new Schema<Driver>({
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

export default mongoose.model<Driver>('Driver', driverSchema);