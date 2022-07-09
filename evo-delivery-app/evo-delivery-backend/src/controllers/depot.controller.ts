import {Request, Response} from "express";
import {depotService} from '../services';
import {Depot} from "../types/depot.type";
import {INVALID, OK} from '../utils/response.utils';


export const getDepots = async (req: Request, res: Response) => {
    try {
        const depots = await depotService.getAll();
        return res.status(200).json(OK(depots));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const getDepot = async (req: Request, res: Response) => {
    const depotId = req.params.id;

    try {
        const depot = await depotService.getById(depotId);
        return res.status(200).json(OK({depot}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const createDepot = async (req: Request, res: Response) => {
    const depotDetails: Partial<Depot> = req.body;

    try {
        const depot = await depotService.create(depotDetails);
        return res.status(200).json(OK({depot}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const updateDepot = async (req: Request, res: Response) => {
    const depotId: string = req.params.id;
    const depotDetails: Partial<Depot> = req.body.depot;

    try {
        const depot = await depotService.update(depotId, depotDetails);
        return res.status(200).json(OK({depot}));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};

export const deleteDepot = async (req: Request, res: Response) => {
    const depotId = req.params.id;

    try {
        await depotService.deleteOne(depotId);
        return res.status(200).json(OK());
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};