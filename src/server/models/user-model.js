import mongoose from 'mongoose';

const Joi = require('@hapi/joi');

mongoose.set('useCreateIndex', true);
const userSchema = mongoose.Schema({
  company: String,
  firstName: String,
  lastName: String,
  userType: String
});
userSchema.set('timestamps', true);

userSchema.methods.JoiValidate = (obj) => {
  const schema = Joi.object({
    company: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    userType: Joi.string()
  });

  return Joi.validate(obj, schema);
};

const User = mongoose.model('User', userSchema);

export default User;
