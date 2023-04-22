import httpStatus from 'http-status';
import mongoose from 'mongoose';
import GroupPreference from './group_preference.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IGroupPreferenceDoc, UpdateGroupPreferenceBody } from './group_preference.interfaces';

/**
 * Create a groupPreference
 * @param {IGroupPreference} groupPreferenceBody
 * @returns {Promise<IGroupPreferenceDoc>}
 */
export const createGroupPreference = async (groupPreferenceBody: IGroupPreferenceDoc): Promise<IGroupPreferenceDoc> => {
  return GroupPreference.create(groupPreferenceBody);
};

/**
 * Query for groupPreferences
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryGroupPreferences = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const groupPreferences = await GroupPreference.paginate(filter, options);
  return groupPreferences;
};

/**
 * Get groupPreference by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IGroupPreferenceDoc | null>}
 */
export const getGroupPreferenceById = async (id: mongoose.Types.ObjectId): Promise<IGroupPreferenceDoc | null> =>
  GroupPreference.findById(id);

/**
 * Update groupPreference by id
 * @param {mongoose.Types.ObjectId} groupPreferenceId
 * @param {UpdateGroupPreferenceBody} updateBody
 * @returns {Promise<IGroupPreferenceDoc | null>}
 */
export const updateGroupPreferenceById = async (
  groupPreferenceId: mongoose.Types.ObjectId,
  updateBody: UpdateGroupPreferenceBody
): Promise<IGroupPreferenceDoc | null> => {
  const groupPreference = await getGroupPreferenceById(groupPreferenceId);
  if (!groupPreference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group preference not found');
  }
  Object.assign(groupPreference, updateBody);
  await groupPreference.save();
  return groupPreference;
};

/**
 * Delete groupPreference by id
 * @param {mongoose.Types.ObjectId} groupPreferenceId
 * @returns {Promise<IGroupPreferenceDoc | null>}
 */
export const deleteGroupPreferenceById = async (
  groupPreferenceId: mongoose.Types.ObjectId
): Promise<IGroupPreferenceDoc | null> => {
  const groupPreference = await getGroupPreferenceById(groupPreferenceId);
  if (!groupPreference) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group preference not found');
  }
  await groupPreference.deleteOne();
  return groupPreference;
};
