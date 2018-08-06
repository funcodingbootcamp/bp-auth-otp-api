import mongoose from 'mongoose';
import { HTTP_ERROR_400, createError } from '../../constants';
import { sanitizePhone } from '../../utils/phone';

const { Schema } = mongoose;
const userSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true
  }
});
const User = mongoose.model('User', userSchema);

const register = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { phone } = request.payload;
    try {
      if (!phone) {
        return h.response(createError('phone no provided!')).code(400);
      }
      const uid = sanitizePhone(phone);
      const user = new User({ uid });
      const res = await user.save();
      console.log('user created\n', res); // eslint-disable-line no-console
      return h.response(res).code(201);
    } catch (e) {
      console.error('!!! error', e); // eslint-disable-line no-console
      if (e.message) {
        return h.response(createError(e.message)).code(400);
      }
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'request-otp',
  register
};

export default pluginExport;
