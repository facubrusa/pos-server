import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface ICategory {
  name: string;
  active: number;
  image: string;
  background_color: string;
  createdAt: Date;
  updateAt: Date;
}

export interface ICategoryDoc extends ICategory, Document {}

export interface ICategoryModel extends Model<ICategoryDoc> {
  isCategoryTaken(name: string, excludeCategoryId?: Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateCategoryBody = Partial<ICategory>;

export interface ICategoryWithTokens {
  category: ICategoryDoc;
  tokens: AccessAndRefreshTokens;
}
