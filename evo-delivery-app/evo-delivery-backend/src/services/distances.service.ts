import distancesModel,{ IDistance, IDistances } from "../database/models/distances.model";


export const addDistance = async (fromOrderId: string, distance : IDistance) => {
    const order = await distancesModel.findById({_id: fromOrderId})

    if (order !== null){
        return await distancesModel.findByIdAndUpdate({_id:fromOrderId},
            {"$push":{distances: distance}})
    }else{
        return await (await distancesModel.create({_id:fromOrderId, distances:[distance]} as IDistances)).save()
    }
}

export const getDistances = async (fromOrderId : string)=> {
    return await distancesModel.findById({_id: fromOrderId})
}

export const getDistance = async (fromOrderId : string, toOrderId: string)=> {
    return await distancesModel.findOne({_id: fromOrderId, "distances.id":toOrderId},{"distances.$": toOrderId})
}