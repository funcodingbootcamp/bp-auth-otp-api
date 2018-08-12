import jwt from 'jsonwebtoken';
import { createError, HTTP_ERROR_400 } from '../../constants';
import { sanitizePhone } from '../../utils/phone';
import User from '../../models/user-model';

const register = async (server, options) => {
  const { apiConfig: { method, path }, jwtConfig: { secret, expiresIn } } = options;

  const handler = async (request, h) => {
    try {
      console.log('headers', request.headers); // eslint-disable-line no-console
      console.log('payload', request.payload); // eslint-disable-line no-console
      const { payload: { phone, code, permissions } } = request;
      if (!phone || !code) {
        return h.response(createError('phone or code not provided!')).code(400);
      }
      const uid = sanitizePhone(phone);
      const codeInt = parseInt(code, 10);

      const users = await User.find({ uid });
      const user = users[0];
      // If User not found
      if (!user) {
        return h.response(createError('user not found!')).code(400);
      }
      console.log('user found', user); // eslint-disable-line
      // If provided code is not correct or valid
      if (codeInt !== user.code || !user.codeValid) {
        return h.response(createError('code not valid!')).code(400);
      }
      // Set code to be not valid any more
      await user.update({ codeValid: false, $inc: { __v: 1 } });
      const payload = { uid, permissions };
      return jwt.sign(payload, secret, { expiresIn });
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
  name: 'verify-otp',
  register
};

export default pluginExport;
