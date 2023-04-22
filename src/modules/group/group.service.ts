import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Group from './group.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IGroupDoc, UpdateGroupBody } from './group.interfaces';

/**
 * Create a group
 * @param {IGroup} groupBody
 * @returns {Promise<IGroupDoc>}
 */
export const createGroup = async (groupBody: IGroupDoc): Promise<IGroupDoc> => {
  if (await Group.isGroupTaken(groupBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Group name already exist');
  }
  return Group.create(groupBody);
};

/**
 * Query for groups
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryGroups = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const groups = await Group.paginate(filter, options);
  return groups;
};

/**
 * Get group by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IGroupDoc | null>}
 */
export const getGroupById = async (id: mongoose.Types.ObjectId): Promise<IGroupDoc | null> => Group.findById(id);

/**
 * Update group by id
 * @param {mongoose.Types.ObjectId} groupId
 * @param {UpdateGroupBody} updateBody
 * @returns {Promise<IGroupDoc | null>}
 */
export const updateGroupById = async (
  groupId: mongoose.Types.ObjectId,
  updateBody: UpdateGroupBody
): Promise<IGroupDoc | null> => {
  const group = await getGroupById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  if (updateBody.name && (await Group.isGroupTaken(updateBody.name, groupId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(group, updateBody);
  await group.save();
  return group;
};

/**
 * Delete group by id
 * @param {mongoose.Types.ObjectId} groupId
 * @returns {Promise<IGroupDoc | null>}
 */
export const deleteGroupById = async (groupId: mongoose.Types.ObjectId): Promise<IGroupDoc | null> => {
  const group = await getGroupById(groupId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  await group.deleteOne();
  return group;
};
