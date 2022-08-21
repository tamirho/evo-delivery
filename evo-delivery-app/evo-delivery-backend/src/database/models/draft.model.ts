import mongoose, {Model, Schema} from "mongoose";
import {DistanceMatrix, EaComponentConfig, EaEvaluateConfig} from "../../types";
import {Draft, DraftData} from "../../types/draft.type";

interface DraftModel extends Model<Draft> {
    getAll(): Promise<Draft[]>;

    getById(id: string): Promise<Draft>;

    getByIds(ids: string[]): Promise<Draft[]>;
}


const eaComponentSchema = new Schema<EaComponentConfig>({
    name: {
        type: String,
        required: true
    },
    args: {
        type: {}
    }
}, {_id: false})


const eaConfigSchema = new Schema<EaEvaluateConfig>({
    popSize: {
        type: Number,
    },
    crossoverProb: {
        type: Number,
    },
    mutateProb: {
        type: Number,
    },
    numGenerations: {
        type: Number,
    },
    crossover: {
        type: eaComponentSchema,
    },
    fitness: {
        type: eaComponentSchema,
    },
    selection: {
        type: eaComponentSchema,
    },
    mutate: {
        type: eaComponentSchema,
    }
}, {_id: false})


const distancesMatrixSchema = new Schema<DistanceMatrix>({
    distances: {
        type: {},
        required: true
    }
}, {_id: false})


const dataSchema = new Schema<DraftData>({
    depot: {
        type: String,
        required: true
    },
    orders: [{
        type: String,
        required: true
    }],
    drivers: [{
        type: String,
        required: true
    }],
    distances: {
        type: {},
        required: true
    }
}, {_id: false})


const DraftSchema = new Schema<Draft, DraftModel>({
        data: {
            type: dataSchema,
            required: true
        },
        config: {
            type: eaConfigSchema,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'Drafts'
    })

DraftSchema.statics.getAll = function () {
    return this.find({});
}

DraftSchema.statics.getById = function (id: string) {
    return this.findById({_id: id}).lean()
}

DraftSchema.statics.getByIds = function (ids: string[]) {
    return this.find({
            '_id': {$in: ids.map(id => new mongoose.Types.ObjectId(id))}
        }
    );
}

export default mongoose.model<Draft, DraftModel>('Draft', DraftSchema);