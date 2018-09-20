import { HTTP_ERROR_400, createError } from '../../../constants/errors';
import { sanitizePhone, generateCode } from '../../../utils/phone';
import twilioClient from '../../../twilio';
import UserOtp from '../../../models/user-model-otp';

const register = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { phone } = request.payload;
    try {
      if (!phone) {
        return h.response(createError('phone not provided!')).code(400);
      }
      const uid = sanitizePhone(phone);
      const users = await UserOtp.find({ uid });
      const user = users[0];
      const code = generateCode();
      const message = await twilioClient.messages.create({
        body: `Your code is ${code}`,
        to: `+${uid}`,
        from: '+19726350916'
      });
      console.log('message.sid', message.sid); // eslint-disable-line
      // Existing User
      if (user) {
        await user.update({ code, codeValid: true, $inc: { __v: 1 } });
        const updatedUsers = await UserOtp.find({ uid });
        console.log('user updated', updatedUsers[0]); // eslint-disable-line
        return h.response('code sent').code(200);
      }
      // New User
      const newUser = new UserOtp({ uid, code, codeValid: true });
      const newUserPersisted = await newUser.save();
      console.log('user created\n', newUserPersisted); // eslint-disable-line
      return h.response('code sent').code(201);
    } catch (e) {
      console.error('!!! error', e); // eslint-disable-line no-console
      if (e.message) {
        return h.response(createError(e.message)).code(400);
      }
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'request-otp',
  register
};

export default pluginExport;
