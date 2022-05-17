import {Request, Response} from "express";
import {eaEngineService} from "../services";
import {INVALID, OK} from "../utils";
import {EaComponentTypes} from "../types";

export const getComponentDetails = async (req: Request, res: Response) => {
    try {
        const componentType = req.params.componentType as EaComponentTypes;
        const componentDetails = await eaEngineService.getComponentDetails(componentType);

        return res.status(200).json(OK(componentDetails));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};