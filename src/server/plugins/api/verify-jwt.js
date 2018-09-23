import jwt from 'jsonwebtoken';
import { createError, HTTP_ERROR_400 } from '../../constants/errors';

const register = async (server, options) => {
  const {
    apiConfig: { method, path }, jwtConfig: { secret }
  } = options;

  const handler = async (request, h) => {
    try {
      const { payload: { token } } = request;
      const payload = jwt.verify(token, secret);
      return { payload };
    } catch (e) {
      console.error('!!! error', e); // eslint-disable-line no-console
      if (e.message) {
        return h.response(createError(e.message));
      }
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'verify-jwt',
  register
};

export default pluginExport;
