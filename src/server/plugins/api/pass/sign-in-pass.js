import Boom from 'boom';
import {
  ERR_MSG_EMAIL_PASS_NOT_CORRECT,
  ERR_MSG_EMAIL_PASS_REQUIRED,
  ERR_MSG_HTTP_ERROR_400
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
      const emailNorm = normalizeEmail(email);
      const users = await UserPass.find({ email: emailNorm });
      const user = users[0];
      if (!user || (user && !user.validatePassword(password))) {
        return Boom.badRequest(ERR_MSG_EMAIL_PASS_NOT_CORRECT);
      }
      const jwt = user.generateJWT(secret, expiresIn);
      return h.response({ payload: jwt }).code(200);
    } catch (e) {
      serverConsoleError('sign-in-pass', e);
      if (e.message) {
        return Boom.badRequest(e.message);
      }
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'sign-in-pass',
  register
};

export default pluginExport;
