import mongoose from 'mongoose';
import { HTTP_ERROR_400, createError } from '../../constants';
import { sanitizePhone, generateCode } from '../../utils/phone';
import twilioClient from '../../twilio';

const { Schema } = mongoose;
const userSchema = new Schema({
  uid: { type: String, unique: true, required: true },
  code: { type: Number }
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
      const users = await User.find({ uid });
      const user = users[0];
      const code = generateCode();
      const message = await twilioClient.messages.create({
        body: `Your code is ${code}`,
        to: `+${uid}`,
        from: '+19726350916'
      });
      console.log('message.sid', message.sid); // eslint-disable-line
      if (user) {
        await user.update({ code, $inc: { __v: 1 } });
        const updatedUsers = await User.find({ uid });
        console.log('user updated', updatedUsers[0]); // eslint-disable-line
        return h.response('code sent').code(200);
      }
      // New User
      const newUser = new User({ uid, code });
      const newUserPersisted = await newUser.save();
      console.log('user created\n', newUserPersisted); // eslint-disable-line
      return h.response('code sent').code(201);
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
