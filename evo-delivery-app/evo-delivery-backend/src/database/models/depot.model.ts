import mongoose, {Model, Schema} from "mongoose";
import {Depot} from "../../types";

interface DepotModel extends Model<Depot> {
    getAll(): Promise<Depot[]>;

    getById(id: string): Promise<Depot>;

    getByIds(ids: string[]): Promise<Depot[]>;
}

export const DepotSchema = new Schema<Depot, DepotModel>({
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
        collection: 'Depots'
    })

DepotSchema.statics.getAll = function () {
    return this.find({});
}

DepotSchema.statics.getById = function (id: string) {
    return this.findById({_id: id}).lean()
}

DepotSchema.statics.getByIds = function (ids: string[]) {
    return this.find({
            '_id': {$in: ids.map(id => new mongoose.Types.ObjectId(id))}
        }
    );
}

export default mongoose.model<Depot, DepotModel>('Depot', DepotSchema);
