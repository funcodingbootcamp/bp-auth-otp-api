import Boom from 'boom';
import { ERR_MSG_HTTP_ERROR_400 } from '../../../constants/errors';
import MnAssesment from '../../../models/mn-assesment';
import { serverConsoleError } from '../../../utils/server-console-error';

const register = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { number } = request.payload || {};
    // const numberInt = parseInt(number, 10);
    try {
      const newMnAssesment = new MnAssesment({ name: `Test ${number}` });
      await newMnAssesment.save();
      return h.response({ payload: 'saved successfully' }).code(200);
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
  name: 'mn-assesment',
  register
};

export default pluginExport;
