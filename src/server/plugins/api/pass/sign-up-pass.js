import Boom from 'boom';
import {
  ERR_MSG_EMAIL_PASS_REQUIRED,
  ERR_MSG_HTTP_ERROR_400,
  ERR_MSG_EMAIL_DUPLICATE
} from '../../../constants/errors';
import UserPass from '../../../models/user-model-pass';
import { normalizeEmail } from '../../../utils/email';
import { serverConsoleError } from '../../../utils/server-console-error';

const register = async (server, options) => {
  const { apiConfig: { method, path }, jwtConfig: { secret, expiresIn } } = options;

  const handler = async (request, h) => {
    const { email, password } = request.payload || {};
    try {
      if (!email || !password) {
        return Boom.badRequest(ERR_MSG_EMAIL_PASS_REQUIRED);
      }
      const newUser = new UserPass({ email: normalizeEmail(email) });
      newUser.setPassword(password);
      const jwt = newUser.generateJWT(secret, expiresIn);
      await newUser.save();
      return h.response({ payload: jwt }).code(200);
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) {
        return Boom.badRequest(ERR_MSG_EMAIL_DUPLICATE);
      }
      serverConsoleError('sign-up-pass', e);
      if (e.message) {
        return Boom.badRequest(e.message);
      }
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'sign-up-pass',
  register
};

export default pluginExport;
