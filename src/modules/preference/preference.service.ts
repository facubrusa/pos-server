import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Preference from './preference.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IPreferenceDoc, UpdatePreferenceBody } from './preference.interfaces';

/**
 * Create a preference
 * @param {IPreference} preferenceBody
 * @returns {Promise<IPreferenceDoc>}
 */
export const createPreference = async (preferenceBody: IPreferenceDoc): Promise<IPreferenceDoc> => {
  if (await Preference.isPreferenceTaken(preferenceBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Preference name already exist');
  }
  return Preference.create(preferenceBody);
};

/**
 * Query for preferences
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryPreferences = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const preferences = await Preference.paginate(filter, options);
  return preferences;
};

/**
 * Get preference by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IPreferenceDoc | null>}
 */
export const getPreferenceById = async (id: mongoose.Types.ObjectId): Promise<IPreferenceDoc | null> =>
  Preference.findById(id);

/**
 * Update preference by id
 * @param {mongoose.Types.ObjectId} preferenceId
 * @param {UpdatePreferenceBody} updateBody
 * @returns {Promise<IPreferenceDoc | null>}
 */
export const updatePreferenceById = async (
  preferenceId: mongoose.Types.ObjectId,
  updateBody: UpdatePreferenceBody
): Promise<IPreferenceDoc | null> => {
  const preference = await getPreferenceById(preferenceId);
  if (!preference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Preference not found');
  }
  if (updateBody.name && (await Preference.isPreferenceTaken(updateBody.name, preferenceId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(preference, updateBody);
  await preference.save();
  return preference;
};

/**
 * Delete preference by id
 * @param {mongoose.Types.ObjectId} preferenceId
 * @returns {Promise<IPreferenceDoc | null>}
 */
export const deletePreferenceById = async (preferenceId: mongoose.Types.ObjectId): Promise<IPreferenceDoc | null> => {
  const preference = await getPreferenceById(preferenceId);
  if (!preference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Preference not found');
  }
  await preference.deleteOne();
  return preference;
};
