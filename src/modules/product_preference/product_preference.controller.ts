import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as productPreferenceService from './product_preference.service';

export const createProductPreference = catchAsync(async (req: Request, res: Response) => {
  const productPreference = await productPreferenceService.createProductPreference(req.body);
  res.status(httpStatus.CREATED).send(productPreference);
});

export const getProductPreferences = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await productPreferenceService.queryProductPreferences(filter, options);
  res.send(result);
});

export const getProductPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productPreferenceId'] === 'string') {
    const productPreference = await productPreferenceService.getProductPreferenceById(
      new mongoose.Types.ObjectId(req.params['productPreferenceId'])
    );
    if (!productPreference) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ProductPreference not found');
    }
    res.send(productPreference);
  }
});

export const updateProductPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productPreferenceId'] === 'string') {
    const productPreference = await productPreferenceService.updateProductPreferenceById(
      new mongoose.Types.ObjectId(req.params['productPreferenceId']),
      req.body
    );
    res.send(productPreference);
  }
});

export const deleteProductPreference = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['productPreferenceId'] === 'string') {
    await productPreferenceService.deleteProductPreferenceById(
      new mongoose.Types.ObjectId(req.params['productPreferenceId'])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});
