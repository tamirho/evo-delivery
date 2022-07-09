import {Request, Response} from "express";
import {draftService} from '../services';
import {Draft} from "../types/draft.type";
import {INVALID, OK} from '../utils/response.utils';
import {EaEvaluateConfig} from "../types";

export type DraftDataApiRequest = {
    drivers: string[],
    orders: string[],
    depot: string
}

export type DraftApiRequest = {
    data: DraftDataApiRequest,
    config: EaEvaluateConfig
}

export const getDrafts = async (req: Request, res: Response) => {
    try {
        const drivers = await draftService.getAll();
        return res.status(200).json(OK(drivers));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getDraft = async (req: Request, res: Response) => {
    const draftId = req.params.id;

    try {
        const draft = await draftService.getById(draftId);
        return res.status(200).json(OK({draft}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const createDraft = async (req: Request, res: Response) => {
    const draftDetails: Partial<Draft> = req.body;

    try {
        const draft = await draftService.create(draftDetails);
        return res.status(200).json(OK({draft}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const updateDraft = async (req: Request, res: Response) => {
    const draftId: string = req.params.id;
    const draftDetails: Partial<Draft> = req.body.draft;

    try {
        const draft = await draftService.update(draftId, draftDetails);
        return res.status(200).json(OK({draft}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const deleteDraft = async (req: Request, res: Response) => {
    const draftId = req.params.id;

    try {
        await draftService.deleteOne(draftId);
        return res.status(200).json(OK());
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};