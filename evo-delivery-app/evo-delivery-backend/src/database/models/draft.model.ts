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
        type:eaComponenSchema,
    },
    fitness: {
        type:eaComponenSchema,
    },
    selection: {
        type:eaComponenSchema,
    },
    mutate: {
        type:eaComponenSchema,
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
        type: String,
        required: true
    },
    orders:[{
        type: String,
        required: true
    }],
    drivers: [{
        type : String,
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

export default mongoose.model<Draft>('Draft', draftSchema);