import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { AUTH_TYPES } from '../constants/authTypes';
import { PERMISSION_TYPES } from '../constants/permissionTypes';

const { Schema } = mongoose;
const userPassSchema = new Schema({
  email: { type: String, unique: true, required: true },
  hash: { type: String },
  salt: { type: String }
});

userPassSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userPassSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userPassSchema.methods.generateJWT = function (secret, expiresIn) {
  const uid = this.email.toLowerCase();
  const permissions = [PERMISSION_TYPES.user];
  return jwt.sign({ uid, permissions, authType: AUTH_TYPES.pass }, secret, { expiresIn });
};

const UserPass = mongoose.model('UserPass', userPassSchema);

export default UserPass;
