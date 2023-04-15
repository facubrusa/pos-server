import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Category from './category.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { ICategory, ICategoryDoc, UpdateCategoryBody } from './category.interfaces';

/**
 * Create a category
 * @param {ICategory} categoryBody
 * @returns {Promise<ICategoryDoc>}
 */
export const createCategory = async (categoryBody: ICategory): Promise<ICategoryDoc> => {
  if (await Category.isCategoryTaken(categoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category name already exist');
  }
  return Category.create(categoryBody);
};

/**
 * Query for categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryCategories = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

/**
 * Get category by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICategoryDoc | null>}
 */
export const getCategoryById = async (id: mongoose.Types.ObjectId): Promise<ICategoryDoc | null> => Category.findById(id);

/**
 * Update category by id
 * @param {mongoose.Types.ObjectId} categoryId
 * @param {UpdateCategoryBody} updateBody
 * @returns {Promise<ICategoryDoc | null>}
 */
export const updateCategoryById = async (
  categoryId: mongoose.Types.ObjectId,
  updateBody: UpdateCategoryBody
): Promise<ICategoryDoc | null> => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.name && (await Category.isCategoryTaken(updateBody.name, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {mongoose.Types.ObjectId} categoryId
 * @returns {Promise<ICategoryDoc | null>}
 */
export const deleteCategoryById = async (categoryId: mongoose.Types.ObjectId): Promise<ICategoryDoc | null> => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await category.deleteOne();
  return category;
};
