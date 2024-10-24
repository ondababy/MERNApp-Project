import { ROLES } from '#constants';
import { Schema } from '#lib';
import bcrypt from 'bcryptjs';
import crypto, { verify } from 'crypto';

const User = new Schema({
  name: 'User',
  schema: [
    {
      username: {
        type: String,
        required: [true, 'Username is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      role: {
        type: String,
        enum: ROLES,
        default: ROLES.CUSTOMER,
      },
      info: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo',
        default: null,
      },

      resetPassword: {
        token: String,
        expire: Date,
      },
      verifyEmail: {
        token: String,
        expire: Date,
      },
      otp: {
        code: Number,
        expire: Date,
      },
      emailVerifiedAt: {
        type: Date,
        default: null,
      },
    },
    { timestamps: true },
  ],
});

User.statics.fillables = ['username', 'email', 'password'];
User.statics.hidden = ['password'];

User.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

User.methods.getVerifyEmailToken = function () {
  const verifyToken = crypto.randomBytes(20).toString('hex');
  this.verifyEmailToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
  this.verifyEmailExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return verifyToken;
};

User.methods.getOTP = function () {
  this.otp.code = Math.floor(100000 + Math.random() * 900000);
  this.otp.expire = Date.now() + 5 * 60 * 1000; // 5 minutes
  return this.otp.code;
};

User.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await this.hashPassword(this.password);
  next();
});
export default User.makeModel();
