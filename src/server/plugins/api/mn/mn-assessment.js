import Boom from 'boom';
import { ERR_MSG_HTTP_ERROR_400 } from '../../../constants/errors';
import MnAssessment from '../../../models/mn-assessment';
import { serverConsoleError } from '../../../utils/server-console-error';
import { generateMnAssessmentJson } from '../../../utils/mn/mn-assessment-generator';

const register = async (server, options) => {
  const { apiConfig: { method, path } } = options;

  const handler = async (request, h) => {
    const { number } = request.payload || {};
    const numberInt = parseInt(number, 10);
    try {
      let res;
      // eslint-disable-next-line
      if (!isNaN(numberInt)) {
        const assessmentsArr = [];
        for (let i = 0; i < numberInt; i++) {
          const assessment = generateMnAssessmentJson();
          assessmentsArr.push({ assessment });
        }
        res = await MnAssessment.insertMany(assessmentsArr);
      }
      return h.response({ payload: 'saved successfully', res }).code(200);
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
  name: 'mn-assessment',
  register
};

export default pluginExport;
