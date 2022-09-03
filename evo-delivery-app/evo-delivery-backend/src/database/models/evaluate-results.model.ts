import mongoose, {Model, Schema} from "mongoose";
import {EvaluateResult, DriverRoute, EaResult, EaEvaluateResponse} from "../../types";
import {DepotSchema} from "./depot.model";
import {OrderSchema} from "./order.model";
import {DriverSchema} from "./driver.model";

interface EvaluateResultsModel extends Model<EvaluateResult> {
    getAll(): Promise<EvaluateResult[]>;

    getById(id: string): Promise<EvaluateResult>;

    getByIds(ids: string[]): Promise<EvaluateResult[]>;

    getByDraftId(draftId: string): Promise<EvaluateResult[]>;
}

const DriverRoute = new Schema<DriverRoute>({
    driver: {
        type: DriverSchema,
        required: true
    },
    orders: {
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
    },
    polyLines: {
        type: [String],
        required: true
    }
}, {
    _id: false
})

const EaResultSchema = new Schema<EaEvaluateResponse>(
  {},
  {
    _id: false,
    timestamps: true,
  }
);

const EvaluateResultSchema = new Schema<EvaluateResult, EvaluateResultsModel>(
  {
    draftId: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    eaResult: {
      type: Object,
    },
    depot: {
      type: DepotSchema,
    },
    routes: {
      type: [DriverRoute],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "EvaluateResults",
  }
);

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

EvaluateResultSchema.statics.getByDraftId = function (draftId: string) {
    return this.find({
            draftId: draftId
        }
    );
}

export default mongoose.model<EvaluateResult, EvaluateResultsModel>('EvaluateResult', EvaluateResultSchema);
