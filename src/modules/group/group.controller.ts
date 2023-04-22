import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as groupService from './group.service';

export const createGroup = catchAsync(async (req: Request, res: Response) => {
  const group = await groupService.createGroup(req.body);
  res.status(httpStatus.CREATED).send(group);
});

export const getGroups = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await groupService.queryGroups(filter, options);
  res.send(result);
});

export const getGroup = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupId'] === 'string') {
    const group = await groupService.getGroupById(new mongoose.Types.ObjectId(req.params['groupId']));
    if (!group) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
    }
    res.send(group);
  }
});

export const updateGroup = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupId'] === 'string') {
    const group = await groupService.updateGroupById(new mongoose.Types.ObjectId(req.params['groupId']), req.body);
    res.send(group);
  }
});

export const deleteGroup = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['groupId'] === 'string') {
    await groupService.deleteGroupById(new mongoose.Types.ObjectId(req.params['groupId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
