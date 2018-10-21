import jwt from 'jsonwebtoken';
import Boom from 'boom';
import { ERR_MSG_HTTP_ERROR_400 } from '../../constants/errors';
import { serverConsoleError } from '../../utils/server-console-error';

const register = async (server, options) => {
  const {
    apiConfig: { method, path }, jwtConfig: { secret }
  } = options;

  const handler = async (request) => {
    try {
      const { payload: { token } } = request;
      const payload = jwt.verify(token, secret);
      return { payload };
    } catch (e) {
      serverConsoleError('verify-jwt', e);
      if (e.message) {
        return Boom.badRequest(e.message);
      }
      return Boom.badRequest(ERR_MSG_HTTP_ERROR_400);
    }
  };

  server.route({ method, path, handler });
};

const pluginExport = {
  name: 'verify-jwt',
  register
};

export default pluginExport;
