import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';
import { IGroupDoc } from '../group/group.interfaces';

export interface IGroupPreference {
  max_quantity: number;
  obligatory: boolean;
  group_id: IGroupDoc['_id'];
  createdAt: Date;
  updateAt: Date;
}

export interface IGroupPreferenceDoc extends IGroupPreference, Document {}

export interface IGroupPreferenceModel extends Model<IGroupPreferenceDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateGroupPreferenceBody = Partial<IGroupPreference>;

export interface IGroupPreferenceWithTokens {
  group_preference: IGroupPreferenceDoc;
  tokens: AccessAndRefreshTokens;
}
