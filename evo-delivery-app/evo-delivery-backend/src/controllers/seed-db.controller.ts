import { Request, Response } from 'express';
import { INVALID, OK } from '../utils';
import { seed } from '../database/seed/seed';

export const seedDB = async (req: Request, res: Response) => {
  try {
    await seed();
    return res.status(200).json(OK());
  } catch (e: any) {
    return res.status(400).json(INVALID(400, e.message));
  }
};
