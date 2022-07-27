import mongoose, {Model, Schema} from "mongoose";
import {EvaluateResult, Order} from "../../types";
import {DepotSchema} from "./depot.model";
import {OrderSchema} from "./order.model";

interface EvaluateResultsModel extends Model<EvaluateResult> {
    getAll(): Promise<EvaluateResult[]>;

    getById(id: string): Promise<EvaluateResult>;

    getByIds(ids: string[]): Promise<EvaluateResult[]>;

    getByDraftId(draftId: string): Promise<EvaluateResult[]>;
}

export type DriverRoute = {
    driverId: string;
    driverName: string;
    route: Partial<Order>[];
    totalDuration: number;
    totalDistance: number;
    load: number;
}

const DriverRoute = new Schema<DriverRoute>({
    driverId: {
        type: String,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    route: {
        type: [OrderSchema],
        required: true
    },
    totalDuration: {
        type: Number,
        required: true
    },
    totalDistance: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
})

const EvaluateResultSchema = new Schema<EvaluateResult, EvaluateResultsModel>({
        draftId: {
            type: String,
            required: true
        },
        depot: {
            type: DepotSchema,
            required: true
        },
        routes: {
            type: [DriverRoute],
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'EvaluateResults'
    }
)

EvaluateResultSchema.statics.getAll = function () {
    return this.find({});
}

EvaluateResultSchema.statics.getById = function (id: string) {
    return this.findById({_id: id}).lean()
}

EvaluateResultSchema.statics.getByIds = function (ids: string[]) {
    return this.find({
            '_id': {$in: ids.map(id => new mongoose.Types.ObjectId(id))}
        }
    );
}

EvaluateResultSchema.statics.getByDraftIds = function (draftId: string) {
    return this.findOne({
            'draftId': draftId
        }
    );
}

export default mongoose.model<EvaluateResult, EvaluateResultsModel>('EvaluateResult', EvaluateResultSchema);
