import { model, Schema } from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IGroupDoc, IGroupModel } from './group.interfaces';

const groupSchema = new Schema<IGroupDoc, IGroupModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);

/**
 * Check if group is taken
 * @param {string} group_id - The group's group
 * @param {ObjectId} [excludeGroupId] - The id of the group to be excluded
 * @returns {Promise<boolean>}
 */
groupSchema.static('isGroupTaken', async function (name: string, excludeGroupId: Schema.Types.ObjectId): Promise<boolean> {
  const group = await this.findOne({ name, _id: { $ne: excludeGroupId } });
  return !!group;
});

const Group = model<IGroupDoc, IGroupModel>('Group', groupSchema);

export default Group;
