import mongoose, {Schema} from "mongoose";
import {MLocation} from "./location.model";

export type MDepot = MLocation & {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const depotSchema = new Schema<MDepot>({
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'Drivers'
    })

export default mongoose.model<MDepot>('Depot', depotSchema);