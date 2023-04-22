import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ProductPreference from './product_preference.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IProductPreferenceDoc, UpdateProductPreferenceBody } from './product_preference.interfaces';

/**
 * Create a productPreference
 * @param {IProductPreference} productPreferenceBody
 * @returns {Promise<IProductPreferenceDoc>}
 */
export const createProductPreference = async (
  productPreferenceBody: IProductPreferenceDoc
): Promise<IProductPreferenceDoc> => {
  return ProductPreference.create(productPreferenceBody);
};

/**
 * Query for productPreferences
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryProductPreferences = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const productPreferences = await ProductPreference.paginate(filter, options);
  return productPreferences;
};

/**
 * Get productPreference by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IProductPreferenceDoc | null>}
 */
export const getProductPreferenceById = async (id: mongoose.Types.ObjectId): Promise<IProductPreferenceDoc | null> =>
  ProductPreference.findById(id);

/**
 * Update productPreference by id
 * @param {mongoose.Types.ObjectId} productPreferenceId
 * @param {UpdateProductPreferenceBody} updateBody
 * @returns {Promise<IProductPreferenceDoc | null>}
 */
export const updateProductPreferenceById = async (
  productPreferenceId: mongoose.Types.ObjectId,
  updateBody: UpdateProductPreferenceBody
): Promise<IProductPreferenceDoc | null> => {
  const productPreference = await getProductPreferenceById(productPreferenceId);
  if (!productPreference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductPreference not found');
  }
  Object.assign(productPreference, updateBody);
  await productPreference.save();
  return productPreference;
};

/**
 * Delete productPreference by id
 * @param {mongoose.Types.ObjectId} productPreferenceId
 * @returns {Promise<IProductPreferenceDoc | null>}
 */
export const deleteProductPreferenceById = async (
  productPreferenceId: mongoose.Types.ObjectId
): Promise<IProductPreferenceDoc | null> => {
  const productPreference = await getProductPreferenceById(productPreferenceId);
  if (!productPreference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductPreference not found');
  }
  await productPreference.deleteOne();
  return productPreference;
};
