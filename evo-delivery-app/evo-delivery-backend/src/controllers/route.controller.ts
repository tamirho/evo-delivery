import { Request, Response } from 'express';

export const getRoutes = async (req: Request, res: Response) => {
  return res.send('get all routes');
};

export const getRoute = async (req: Request, res: Response) => {
  return res.send('get route by id');
};

export const deleteRoute = async (req: Request, res: Response) => {
  return res.send('delete route by id');
};
