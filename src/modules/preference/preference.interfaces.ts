import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IPreference {
  name: string;
  surcharge: number;
  active: boolean;
  stock: number;
  createdAt: Date;
  updateAt: Date;
}

export interface IPreferenceDoc extends IPreference, Document {}

export interface IPreferenceModel extends Model<IPreferenceDoc> {
  isPreferenceTaken(name: string, excludePreferenceId?: Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdatePreferenceBody = Partial<IPreference>;

export interface IPreferenceWithTokens {
  preference: IPreferenceDoc;
  tokens: AccessAndRefreshTokens;
}
