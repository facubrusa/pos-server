import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { ICategoryDoc, ICategoryModel } from './category.interfaces';

const categorySchema = new Schema<ICategoryDoc, ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
    background_color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if category is taken
 * @param {string} category_id - The category's category
 * @param {ObjectId} [excludeCategoryId] - The id of the category to be excluded
 * @returns {Promise<boolean>}
 */
categorySchema.static(
  'isCategoryTaken',
  async function (name: string, excludeCategoryId: Schema.Types.ObjectId): Promise<boolean> {
    const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
    return !!category;
  }
);

const Category = model<ICategoryDoc, ICategoryModel>('Category', categorySchema);

export default Category;
