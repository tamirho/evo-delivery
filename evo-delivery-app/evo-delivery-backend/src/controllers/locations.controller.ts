import {Request, Response} from "express";
import {locationsService} from '../services';
import {INVALID, OK} from '../utils/response.utils';
import {Location} from "../types";

export const geFullLocation = async (req: Request, res: Response) => {
    try {
        if (req.query.address && req.query.latlng) {
            return res.status(400).json(INVALID(400, "Address and LatLng was sent but only one is required"))
        }

        if (!req.query.address && !req.query.latlng) {
            return res.status(400).json(INVALID(400, "Address or LatLng are required"))
        }

        const maybeAddress = req.query.address;
        const maybeLatLng = (req.query.latlng as string || "0,0")
            .split(',')
            .map(v => Number(v));


        const partialLocation = {
            address: maybeAddress,
            latitude: maybeLatLng[0],
            longitude: maybeLatLng[1]
        } as Partial<Location>;

        const fullLocation = await locationsService.getFullLocation(partialLocation);

        return res.status(200).json(OK(fullLocation));
    } catch (e: any) {
        return res.status(400).json(INVALID(400, e.message));
    }
};
