import requestOtp from './plugins/api/request-otp';
import verifyCode from './plugins/api/verify-code';
import verifyJwt from './plugins/api/verify-jwt';

import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from './plugins/api/courses-api';

const getPlugins = config => [
  {
    plugin: requestOtp,
    options: { apiConfig: config.services.requestOtp }
  },
  {
    plugin: verifyCode,
    options: { apiConfig: config.services.verifyCode, jwtConfig: config.jwt }
  },
  {
    plugin: verifyJwt,
    options: { apiConfig: config.services.verifyJwt, jwtConfig: config.jwt }
  },
  {
    plugin: coursesPlugin,
    options: { apiConfig: config.services.courses }
  },
  {
    plugin: coursePostPlugin,
    options: { apiConfig: config.services.coursePost }
  },
  {
    plugin: coursePlugin,
    options: { apiConfig: config.services.course }
  },
  {
    plugin: coursePatchPlugin,
    options: { apiConfig: config.services.coursePatch }
  },
  {
    plugin: courseDeletePlugin,
    options: { apiConfig: config.services.courseDelete }
  }
];

export default getPlugins;
