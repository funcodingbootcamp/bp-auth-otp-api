const appId = 'bp-auth-otp-api';
const useMocks = process.env.APP_MOCKS === '1';
const appModeDev = process.env.APP_MODE_DEV === '1';
const serviceHost = process.env.SERVICE_HOST || '0.0.0.0';
const mongoDbHost = process.env.MONGODB_HOST || '0.0.0.0';
const mongoDbUser = process.env.MONGODB_USER;
const mongoDbPass = process.env.MONGODB_PASS;
const mongoDbName = process.env.MONGODB_NAME || 'bp_auth_otp';
const env = process.env.NODE_ENV || 'localhost';
const port = process.env.PORT || 3000;
const { PROD_BUILD } = process.env;
console.log('useMocks', useMocks); // eslint-disable-line
console.log('serviceHost', serviceHost); // eslint-disable-line
console.log('mongoDbHost', mongoDbHost); // eslint-disable-line
console.log('mongoDbUser', mongoDbUser); // eslint-disable-line
console.log('mongoDbPass', mongoDbPass); // eslint-disable-line
console.log('mongoDbName', mongoDbName); // eslint-disable-line
console.log('env', env); // eslint-disable-line
console.log('PROD_BUILD', PROD_BUILD); // eslint-disable-line

export default function getConfig() {
  return {
    useMocks,
    appModeDev,
    env,
    appId,
    basePath: '',
    devtools: true,

    server: {
      serviceHost,
      mongoDbHost,
      mongoDbUser,
      mongoDbPass,
      mongoDbName,
      port
    },

    jwt: {
      secret: 'NeverShareYourSecret',
      expiresIn: 86400 // seconds
    },

    services: {
      indexPage: {
        method: 'GET',
        path: ''
      },

      requestOtp: {
        method: 'POST',
        path: '/api/request-otp'
      },
      verifyOtp: {
        method: 'POST',
        path: '/api/verify-otp'
      },
      verifyJwt: {
        method: 'POST',
        path: '/api/verify-jwt'
      },

      signUpPass: {
        method: 'POST',
        path: '/api/sign-up-pass'
      },
      signInPass: {
        method: 'POST',
        path: '/api/sign-in-pass'
      },

      courses: {
        method: 'GET',
        path: '/api/courses'
      },
      coursePost: {
        method: 'POST',
        path: '/api/courses'
      },
      course: {
        method: 'GET',
        path: '/api/courses/{courseId}'
      },
      coursePatch: {
        method: 'PATCH',
        path: '/api/courses/{courseId}'
      },
      courseDelete: {
        method: 'DELETE',
        path: '/api/courses/{courseId}'
      },

      mnAssesmentPost: {
        method: 'POST',
        path: '/api/mn-assesment'
      }
    }
  };
}
