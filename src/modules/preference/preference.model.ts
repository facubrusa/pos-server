import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IPreferenceDoc, IPreferenceModel } from './preference.interfaces';

const preferenceSchema = new Schema<IPreferenceDoc, IPreferenceModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    surcharge: {
      type: Number,
      required: false,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
preferenceSchema.plugin(toJSON);
preferenceSchema.plugin(paginate);

/**
 * Check if preference is taken
 * @param {string} preference_id - The preference's preference
 * @param {ObjectId} [excludePreferenceId] - The id of the preference to be excluded
 * @returns {Promise<boolean>}
 */
preferenceSchema.static(
  'isPreferenceTaken',
  async function (name: string, excludePreferenceId: Schema.Types.ObjectId): Promise<boolean> {
    const preference = await this.findOne({ name, _id: { $ne: excludePreferenceId } });
    return !!preference;
  }
);

const Preference = model<IPreferenceDoc, IPreferenceModel>('Preference', preferenceSchema);

export default Preference;
