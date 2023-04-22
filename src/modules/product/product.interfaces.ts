import { Model, Document, Types } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';
import { ICategoryDoc } from '../category/category.interfaces';

export interface IProduct {
  name: string;
  description: string;
  barcode: string;
  price: number;
  active: boolean;
  stock: number;
  image: string;
  background_color: string;
  category_id: ICategoryDoc['_id'];
  createdAt: Date;
  updateAt: Date;
}

export interface IProductDoc extends IProduct, Document {}

export interface IProductModel extends Model<IProductDoc> {
  isProductTaken(name: string, excludeProductId?: Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateProductBody = Partial<IProduct>;

export interface IProductWithTokens {
  product: IProductDoc;
  tokens: AccessAndRefreshTokens;
}
