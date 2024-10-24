import { Schema } from '#lib';

const UserInfo = new Schema({
  name: 'UserInfo',
  schema: [
    {
      first_name: {
        type: String,
        required: [true, 'Username is required'],
      },
      last_name: {
        type: String,
        required: [true, 'Username is required'],
      },
      contact: {
        type: String,
        required: [true, 'Username is required'],
        regex: /^[0-9]{10}$/,
        unique: [true, 'Contact already exists'],
      },
      birthdate: {
        type: Date,
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      region: {
        type: String,
        required: [true, 'Region is required'],
      },
      zip_code: {
        type: String,
      },
    },
  ],
});

export default UserInfo.makeModel();

