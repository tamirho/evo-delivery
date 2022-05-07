import distancesModel,{ IDistance, IDistances } from "../database/models/distances.model";


export const addDistance = async (orderId: string, distance : IDistance) => {
    const order = await distancesModel.findById({_id: orderId})

    if (order !==null){
        return await distancesModel.findByIdAndUpdate({_id:orderId},
            {"$push":{distances: distance}})
    }else{
        return await (await distancesModel.create({_id:orderId, distances:[distance]} as IDistances)).save()
    }
}

export const getDistances = async (orderId : string)=> {
    return await distancesModel.findById({_id: orderId})
}