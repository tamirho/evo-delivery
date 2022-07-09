import { Request, Response } from "express";
import { draftService } from '../services';
import { Draft } from "../types/draft.type";
import { INVALID, OK } from '../utils/response.utils';

export const getDrafts = async (req: Request, res: Response) => {
    const page : number= Number(req.query.page as string) || 1;
    const limit : number= Number(req.query.limit as string) || 100;
    const filter: Object = req.query.filter as Object || {}
    try {
      const drivers = await draftService.getDrafts(filter, page, limit);
      return res.status(200).json(OK(drivers));
    } catch (e: any) {
      return res.status(400).json(INVALID(400, e.message));
    }
};

export const getDraft = async (req: Request, res: Response) => {
    const draftId = req.params.id;
  
    try {
      const draft = await draftService.getDraft(draftId);
      return res.status(200).json(OK({ draft }));
    } catch (e: any) {
      return res.status(400).json(INVALID(400, e.message));
    }
};
  
export const createDraft = async (req: Request, res: Response) => {
    const draftDetails : Partial<Draft> = req.body.draft;

    try {
      const draft = await draftService.createDraft(draftDetails);
      return res.status(200).json(OK({ draft }));
    } catch (e: any) {
      return res.status(400).json(INVALID(400, e.message));
    }
};

export const updateDraft = async (req: Request, res: Response) => {
    const draftId: string = req.params.id;
    const draftDetails: Partial<Draft> = req.body.draft;
  
    try {
      const draft = await draftService.updateDraft(draftId, draftDetails);
      return res.status(200).json(OK({ draft }));
    } catch (e: any) {
      return res.status(400).json(INVALID(400, e.message));
    }
};
  
export const deleteDraft = async (req: Request, res: Response) => {
    const draftId = req.params.id;
  
    try {
      await draftService.deleteDraft(draftId);
      return res.status(200).json(OK());
    } catch (e: any) {
      return res.status(400).json(INVALID(400, e.message));
    }
};