import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
  company: String,
  firstName: String,
  lastName: String,
  userType: String
});
userSchema.set('timestamps', true);
const User = mongoose.model('User', userSchema);

export default User;
