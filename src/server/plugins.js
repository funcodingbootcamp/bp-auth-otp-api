import requestOtp from "./plugins/api/otp/request-otp";
import verifyOtp from "./plugins/api/otp/verify-otp";
import verifyJwt from "./plugins/api/verify-jwt";

import signUpPass from "./plugins/api/pass/sign-up-pass";
import signInPass from "./plugins/api/pass/sign-in-pass";

import {
  coursesPlugin,
  coursePostPlugin,
  coursePlugin,
  coursePatchPlugin,
  courseDeletePlugin
} from "./plugins/api/courses-api";

import {
  clientsPlugin,
  clientPostPlugin,
  clientPlugin,
  clientPatchPlugin,
  clientDeletePlugin
} from "./plugins/api/clients-api";

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
  },
  {
    plugin: signInPass,
    options: { apiConfig: config.services.signInPass, jwtConfig: config.jwt }
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
  },
  {
    plugin: clientsPlugin,
    options: { apiConfig: config.services.clients }
  },
  {
    plugin: clientPostPlugin,
    options: { apiConfig: config.services.clientPost }
  },
  {
    plugin: clientPlugin,
    options: { apiConfig: config.services.client }
  },
  {
    plugin: clientPatchPlugin,
    options: { apiConfig: config.services.clientPatch }
  },
  {
    plugin: clientDeletePlugin,
    options: { apiConfig: config.services.clientDelete }
  }
];

export default getPlugins;
