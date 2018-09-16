import requestOtp from './plugins/api/request-otp';
import verifyOtp from './plugins/api/verify-otp';
import verifyJwt from './plugins/api/verify-jwt';

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
  }
];

export default getPlugins;
