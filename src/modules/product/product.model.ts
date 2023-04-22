import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IProductDoc, IProductModel } from './product.interfaces';

const productSchema = new Schema<IProductDoc, IProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    barcode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    background_color: {
      type: String,
      required: true,
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if product is taken
 * @param {string} product_id - The product's product
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.static(
  'isProductTaken',
  async function (name: string, excludeProductId: Schema.Types.ObjectId): Promise<boolean> {
    const product = await this.findOne({ name, _id: { $ne: excludeProductId } });
    return !!product;
  }
);

const Product = model<IProductDoc, IProductModel>('Product', productSchema);

export default Product;
