import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IProductPreferenceDoc, IProductPreferenceModel } from './product_preference.interfaces';

const productSchema = new Schema<IProductPreferenceDoc, IProductPreferenceModel>({
  preference_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Preference',
  },
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  group_preference_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'GroupPreference',
  },
});

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const ProductPreference = model<IProductPreferenceDoc, IProductPreferenceModel>('Product_Preference', productSchema);

export default ProductPreference;
