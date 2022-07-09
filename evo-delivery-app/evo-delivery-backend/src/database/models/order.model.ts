import mongoose, {Model, Schema} from "mongoose";
import {Order} from "../../types";

interface OrderModel extends Model<Order> {
    getAll(): Promise<Order[]>;

    getById(id: string): Promise<Order>;

    getByIds(ids: string[]): Promise<Order[]>;
}


const orderSchema = new Schema<Order, OrderModel>({
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

export default mongoose.model<Order, OrderModel>('Order', orderSchema);
