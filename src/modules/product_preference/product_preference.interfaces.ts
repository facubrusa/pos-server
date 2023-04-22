import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';
import { IPreferenceDoc } from '../preference/preference.interfaces';
import { IProductDoc } from '../product/product.interfaces';
import { IGroupPreferenceDoc } from '../group_preference/group_preference.interfaces';

export interface IProductPreference {
  preference_id: IPreferenceDoc['_id'];
  product_id: IProductDoc['_id'];
  group_preference_id: IGroupPreferenceDoc['_id'];
}

export interface IProductPreferenceDoc extends IProductPreference, Document {}

export interface IProductPreferenceModel extends Model<IProductPreferenceDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateProductPreferenceBody = Partial<IProductPreference>;

export interface IProductPreferenceWithTokens {
  product_preference: IProductPreferenceDoc;
  tokens: AccessAndRefreshTokens;
}
