import mongoose,{Schema} from "mongoose";

export interface IDriver{
    _id?: mongoose.Types.ObjectId;
    name: string;
    maxCapacity: number;
    maxDistance: number;
    createdAt: Date;
    updatedAt: Date;
}

const driverSchema = new Schema<IDriver>({
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

export default mongoose.model<IDriver>('Driver', driverSchema);

