import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IGroup {
  name: string;
  active: boolean;
  createdAt: Date;
  updateAt: Date;
}

export interface IGroupDoc extends IGroup, Document {}

export interface IGroupModel extends Model<IGroupDoc> {
  isGroupTaken(name: string, excludeGroupId?: Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateGroupBody = Partial<IGroup>;

export interface IGroupWithTokens {
  group: IGroupDoc;
  tokens: AccessAndRefreshTokens;
}
