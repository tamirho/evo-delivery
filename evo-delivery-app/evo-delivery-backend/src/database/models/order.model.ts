import mongoose, {Model, Schema} from "mongoose";
import {Order} from "../../types";

interface OrderModel extends Model<Order> {
    getAll(): Promise<Order[]>;

    getById(id: string): Promise<Order>;

    getByIds(ids: string[]): Promise<Order[]>;
}


export const OrderSchema = new Schema<Order, OrderModel>({
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
            type: String,
            default: false
        },
        weight: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'Orders'
    }
)

OrderSchema.statics.getAll = function () {
    return this.find({});
}

OrderSchema.statics.getById = function (id: string) {
    return this.findById({_id: id}).lean()
}

OrderSchema.statics.getByIds = function (ids: string[]) {
    return this.find({
            '_id': {$in: ids.map(id => new mongoose.Types.ObjectId(id))}
        }
    );
}

export default mongoose.model<Order, OrderModel>('Order', OrderSchema);
