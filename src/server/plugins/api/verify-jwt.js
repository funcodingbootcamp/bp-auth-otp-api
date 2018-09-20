import jwt from 'jsonwebtoken';
import { createError, HTTP_ERROR_400 } from '../../constants/errors';

const register = async (server, options) => {
  const {
    apiConfig: { method, path }, jwtConfig: { secret }
  } = options;

  const handler = async (request, h) => {
    try {
      const { payload: { token } } = request;
      const data = jwt.verify(token, secret);
      console.log(['info'], `verify-jwt-plugin. Data: ${JSON.stringify(data)}`); // eslint-disable-line no-console
      return data;
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
  name: 'verify-jwt',
  register
};

export default pluginExport;
