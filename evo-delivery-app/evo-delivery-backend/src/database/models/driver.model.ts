import mongoose, {Model, Schema} from "mongoose";
import {Driver} from "../../types/driver.type";

interface DriverModel extends Model<Driver> {
    getAll(): Promise<Driver[]>;

    getById(id: string): Promise<Driver>;

    getByIds(ids: string[]): Promise<Driver[]>;
}

const DriverSchema = new Schema<Driver, DriverModel>({
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

DriverSchema.statics.getAll = function () {
    return this.find({});
}

DriverSchema.statics.getById = function (id: string) {
    return this.findById({_id: id}).lean()
}

DriverSchema.statics.getByIds = function (ids: string[]) {
    return this.find({
            '_id': {$in: ids.map(id => new mongoose.Types.ObjectId(id))}
        }
    );
}

export default mongoose.model<Driver, DriverModel>('Driver', DriverSchema);