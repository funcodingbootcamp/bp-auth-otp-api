import { HTTP_ERROR_400, createError } from '../../../constants/errors';
import UserPass from '../../../models/user-model-pass';
import { normalizeEmail } from '../../../utils/email';

const register = async (server, options) => {
  const { apiConfig: { method, path }, jwtConfig: { secret, expiresIn } } = options;

  const handler = async (request, h) => {
    const { email, password } = request.payload || {};
    try {
      if (!email || !password) {
        return h.response(createError('email or password not provided!')).code(400);
      }
      const newUser = new UserPass({ email: normalizeEmail(email) });
      newUser.setPassword(password);
      const jwt = newUser.generateJWT(secret, expiresIn);
      await newUser.save();
      return h.response(jwt).code(200);
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
  name: 'sign-up-pass',
  register
};

export default pluginExport;
