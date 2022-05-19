import mongoose, { Schema } from "mongoose";


export interface IDistances{
    _id: string;
    distances: [IDistance];
}

export interface IDistance {
    id: string,
    distance: number,
    duration: number,
}

const distanceSchema = new Schema<IDistance>({
    id: {
        type: String,
        required:true,
        unique: true,
    },
    distance: {
        type: Number,
        required: true
    }
},{_id: false})

const distancesSchema = new Schema<IDistances>({
    _id: {
        type: String,
        required: true
    },
    distances: [distanceSchema]
},
{
    collection: "Distances"
})

export default mongoose.model<IDistances>('Distances', distancesSchema);
