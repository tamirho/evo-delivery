import mongoose,{Schema} from "mongoose";
import { Driver } from "../../types/driver.type";

const driverSchema = new Schema<Driver>({
    name: {
        type: String,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true,
        min: 1
    },
    maxDistance: {
        type: Number,
        required: true,
        min: 1
    }},
    {
        timestamps: true,
        collection: 'Drivers'
    })

export default mongoose.model<Driver>('Driver', driverSchema);