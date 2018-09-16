import requestOtp from './plugins/api/otp/request-otp';
import verifyOtp from './plugins/api/otp/verify-otp';
import verifyJwt from './plugins/api/verify-jwt';

import signUpPass from './plugins/api/pass/sign-up-pass';

const getPlugins = config => [
  {
    plugin: requestOtp,
    options: { apiConfig: config.services.requestOtp }
  },
  {
    plugin: verifyOtp,
    options: { apiConfig: config.services.verifyOtp, jwtConfig: config.jwt }
  },
  {
    plugin: verifyJwt,
    options: { apiConfig: config.services.verifyJwt, jwtConfig: config.jwt }
  },
  {
    plugin: signUpPass,
    options: { apiConfig: config.services.signUpPass, jwtConfig: config.jwt }
  }
];

export default getPlugins;
