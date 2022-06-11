import mongoose, { Schema, trusted } from "mongoose";
import { Location, Order } from "../../types";



const orderSchema = new Schema<Order>({
    address: {
        type:String
    },
    shippingDate: {
        type: Date,
        default: new Date()
    },
    weight: {
        type : Number,
        required: true
    }},
    {
        timestamps: true,
        collection: 'Orders'
    }
)

export default mongoose.model<Order>('Order', orderSchema);
