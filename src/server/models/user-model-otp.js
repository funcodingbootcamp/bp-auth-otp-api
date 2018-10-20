import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true)
const { Schema } = mongoose;
const userOtpSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  code: { type: Number },
  codeValid: { type: Boolean }
});
const UserOtp = mongoose.model('UserOtp', userOtpSchema);

export default UserOtp;
