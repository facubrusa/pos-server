import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as preferenceService from './preference.service';

export const createPreference = catchAsync(async (req: Request, res: Response) => {
  const preference = await preferenceService.createPreference(req.body);
  res.status(httpStatus.CREATED).send(preference);
});

export const getPreferences = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await preferenceService.queryPreferences(filter, options);
  res.send(result);
});

export const getPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['preferenceId'] === 'string') {
    const preference = await preferenceService.getPreferenceById(new mongoose.Types.ObjectId(req.params['preferenceId']));
    if (!preference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Preference not found');
    }
    res.send(preference);
  }
});

export const updatePreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['preferenceId'] === 'string') {
    const preference = await preferenceService.updatePreferenceById(
      new mongoose.Types.ObjectId(req.params['preferenceId']),
      req.body
    );
    res.send(preference);
  }
});

export const deletePreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['preferenceId'] === 'string') {
    await preferenceService.deletePreferenceById(new mongoose.Types.ObjectId(req.params['preferenceId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
