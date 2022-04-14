import { Request, Response } from 'express';

export const getRoutes = async (req: Request, res: Response) => {
  return res.send('get all routes');
};

export const getRoute = async (req: Request, res: Response) => {
  return res.send('get route by id');
};

export const createRoute = async (req: Request, res: Response) => {
  return res.send('create new route');
};

export const updateRoute = async (req: Request, res: Response) => {
  return res.send('update route by id');
};

export const deleteRoute = async (req: Request, res: Response) => {
  return res.send('delete route by id');
};
