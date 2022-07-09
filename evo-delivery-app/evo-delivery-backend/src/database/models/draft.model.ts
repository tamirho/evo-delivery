import mongoose, {Schema} from "mongoose";
import {DistanceMatrix, EaComponentConfig, EaEvaluateConfig} from "../../types";
import {Depot} from "../../types/depot.type";

export type MDraft = {
    _id?: string;
    depotId: string;
    ordersIds: string[];
    driversIds: string[];
    eaConfig: EaEvaluateConfig;
    distances: DistanceMatrix;
    createdAt: Date;
    updatedAt: Date;
};

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

const draftSchema = new Schema<MDraft>({
        depotId: {
            type: String,
            required: true
        },
        ordersIds: [{
            type: String,
            required: true
        }],
        driversIds: [{
            type: String,
            required: true
        }],
        eaConfig: {
            type: eaConfigSchema,
            required: true
        },
        distances: {
            type: distancesMatrixSchema,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'Draft'
    })

export default mongoose.model<MDraft>('Draft', draftSchema);