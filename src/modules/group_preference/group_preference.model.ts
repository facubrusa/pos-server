import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IGroupPreferenceDoc, IGroupPreferenceModel } from './group_preference.interfaces';

const groupPreferenceSchema = new Schema<IGroupPreferenceDoc, IGroupPreferenceModel>(
  {
    max_quantity: {
      type: Number,
      required: true,
      min: -1,
    },
    obligatory: {
      type: Boolean,
      required: true,
    },
    group_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Group',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
groupPreferenceSchema.plugin(toJSON);
groupPreferenceSchema.plugin(paginate);

const GroupPreference = model<IGroupPreferenceDoc, IGroupPreferenceModel>('Group_Preference', groupPreferenceSchema);

export default GroupPreference;
