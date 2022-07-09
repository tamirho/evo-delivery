import mongoose, {Schema} from "mongoose";
import {MLocation} from "./location.model";

export type MOrder = MLocation & {
    shippingDate: Date;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
};

const orderSchema = new Schema<MOrder>({
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
        },
        shippingDate: {
            type: Date,
            default: new Date()
        },
        weight: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'Orders'
    }
)

export default mongoose.model<MOrder>('Order', orderSchema);
