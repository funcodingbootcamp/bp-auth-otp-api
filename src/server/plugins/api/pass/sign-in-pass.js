import { HTTP_ERROR_400, createError } from '../../../constants/errors';
import UserPass from '../../../models/user-model-pass';
import { normalizeEmail } from '../../../utils/email';

const ERR_MSG_EMAIL_PASS_REQUIRED = 'email or password not provided!';
const ERR_MSG_EMAIL_PASS_NOT_CORRECT = 'email or password not correct!';

const register = async (server, options) => {
  const { apiConfig: { method, path }, jwtConfig: { secret, expiresIn } } = options;

  const handler = async (request, h) => {
    const { email, password } = request.payload || {};
    try {
      if (!email || !password) {
        return h.response(createError(ERR_MSG_EMAIL_PASS_REQUIRED)).code(400);
      }
      const emailNorm = normalizeEmail(email);
      const users = await UserPass.find({ email: emailNorm });
      const user = users[0];
      if (!user) {
        return h.response(createError(ERR_MSG_EMAIL_PASS_NOT_CORRECT)).code(400);
      }
      if (!user.validatePassword(password)) {
        return h.response(createError(ERR_MSG_EMAIL_PASS_NOT_CORRECT)).code(400);
      }
      const jwt = user.generateJWT(secret, expiresIn);
      return h.response({ payload: jwt }).code(200);
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
  name: 'sign-in-pass',
  register
};

export default pluginExport;
