import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as groupPreferenceService from './group_preference.service';

export const createGroupPreference = catchAsync(async (req: Request, res: Response) => {
  const groupPreference = await groupPreferenceService.createGroupPreference(req.body);
  res.status(httpStatus.CREATED).send(groupPreference);
});

export const getGroupPreferences = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await groupPreferenceService.queryGroupPreferences(filter, options);
  res.send(result);
});

export const getGroupPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupPreferenceId'] === 'string') {
    const groupPreference = await groupPreferenceService.getGroupPreferenceById(
      new mongoose.Types.ObjectId(req.params['groupPreferenceId'])
    );
    if (!groupPreference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'GroupPreference not found');
    }
    res.send(groupPreference);
  }
});

export const updateGroupPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupPreferenceId'] === 'string') {
    const groupPreference = await groupPreferenceService.updateGroupPreferenceById(
      new mongoose.Types.ObjectId(req.params['groupPreferenceId']),
      req.body
    );
    res.send(groupPreference);
  }
});

export const deleteGroupPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupPreferenceId'] === 'string') {
    await groupPreferenceService.deleteGroupPreferenceById(new mongoose.Types.ObjectId(req.params['groupPreferenceId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
