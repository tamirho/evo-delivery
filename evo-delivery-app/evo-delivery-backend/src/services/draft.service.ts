import draftModel from '../database/models/draft.model';
import { Draft } from '../types/draft.type';

export const getDrafts = async (filter: Object, page:number, limit:number) => {
    return draftModel.find({},null,{limit:limit}).lean()
};

export const getDraft = async (draftId: string): Promise<Draft> => {
    return draftModel.findById({_id:draftId}).lean()
};

export const createDraft = async (draft: Partial<Draft>) => {
    return (await draftModel.create(draft)).save()
};

export const updateDriver = async (draftId: string, draft: Partial<Draft>) => {
    return await draftModel.findOneAndUpdate({_id:draftId}, draft, {returnOriginal: false})
};
  
export const deleteDriver = async (id: string) => {
    return await draftModel.deleteOne({_id:id})
 };