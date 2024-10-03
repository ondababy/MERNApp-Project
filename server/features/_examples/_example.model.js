import { Schema } from '#lib';
import { imageSchema } from '#utils';

const _Example = new Schema({
  name: '_Example',
  schema: [
    {
      name: {
        type: String,
        unique: [true, '_Example name must be unique'],
        required: [true, '_Example name is required'],
      },
      slug: {
        type: String,
      },
      image: [{ imageSchema }],
    },
    { timestamps: true },
  ],
});

_Example.statics.fillables = [];
_Example.statics.hidden = [];

export default _Example.makeModel();
