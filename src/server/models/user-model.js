import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  code: { type: Number },
  codeValid: { type: Boolean }
});
const User = mongoose.model('User', userSchema);

export default User;
