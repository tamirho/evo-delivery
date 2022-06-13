import mongoose, { Schema } from "mongoose";
import { DistanceMatrix, EaComponentConfig, EaEvaluateConfig } from "../../types";
import { Depot } from "../../types/depot.type";
import { Draft } from "../../types/draft.type";

const depotSchema = new Schema<Depot>({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
},{_id:false})

const eaComponenSchema = new Schema <EaComponentConfig>({
    name: {
        type: String,
        required: true
    },
    args:{
        type: {}
    }
},{_id:false})

const eaConfigSchema = new Schema<EaEvaluateConfig>({
    popSize: {
        type: Number,
        default: 100
    },
    crossoverProb: {
        type: Number,
        default: 0.5
    },
    mutateProb: {
        type: Number,
        default: 0.5
    },
    numGenerations: {
        type: Number,
        default: 200
    },
    crossover: {
        type:eaComponenSchema,
        required: true
    },
    fitness: {
        type:eaComponenSchema,
        required: true
    },
    selection: {
        type:eaComponenSchema,
        required: true
    },
    mutate: {
        type:eaComponenSchema,
        required: true
    }
},{_id:false})

const distancesMatrixSchema = new Schema <DistanceMatrix>({
    distances:{
        type:{},
        required: true
    }
},{_id:false})

const draftSchema = new Schema<Draft>({
    depot: {
        type: depotSchema,
        required: true
    },
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

export default mongoose.model<Draft>('Draft', draftSchema);