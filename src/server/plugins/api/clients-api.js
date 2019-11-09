import { HTTP_ERROR_400, createError } from '../../constants/errors';
import { serverConsoleError } from '../../utils/server-console-error';
import Client from '../../models/client-model';

// clients index
const registerClients = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async () => {
    try {
      const res = await Client.find();
      return res;
    } catch (e) {
      serverConsoleError('clientsPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const clientsPlugin = {
  name: 'clientsPlugin',
  register: registerClients
};

// create client
const registerClientPost = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async (request, h) => {
    try {
      const client = new Client(request.payload);
      const res = await client.save();
      return h.response(res).code(201);
    } catch (e) {
      serverConsoleError('clientPostPlugin', e);
      return HTTP_ERROR_400;
    }
  };

  server.route({ method, path, handler });
};
export const clientPostPlugin = {
  name: 'clientPostPlugin',
  register: registerClientPost
};

// read client
const registerClient = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async (request, h) => {
    const { params: { clientId } = {} } = request;
    try {
      const clients = await Client.find({ _id: clientId });
      if (clients.length === 1) {
        return h.response(clients[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('clientPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const clientPlugin = { name: 'clientPlugin', register: registerClient };

// update client
const registerClientPatch = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async (request, h) => {
    const { params: { clientId } = {}, payload } = request;
    console.log(payload);
    try {
      const clients = await Client.find({ _id: clientId });
      if (clients.length === 1) {
        await clients[0].updateOne({ ...payload, $inc: { __v: 1 } });
        const res = await Client.find({ _id: clientId });
        return h.response(res[0]).code(200);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('clientPatchPlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};
export const clientPatchPlugin = {
  name: 'clientPatchPlugin',
  register: registerClientPatch
};

// delete client
const registerClientDelete = async (server, options) => {
  const {
    apiConfig: { method, path }
  } = options;

  const handler = async (request, h) => {
    const { params: { clientId } = {} } = request;
    try {
      const clients = await Client.find({ _id: clientId });
      if (clients.length > 0) {
        await Client.find({ _id: clientId }).deleteOne();
        return h.response().code(204);
      }
      return h.response(createError('Document not found')).code(400);
    } catch (e) {
      serverConsoleError('clientDeletePlugin', e);
      return h.response(HTTP_ERROR_400).code(400);
    }
  };

  server.route({ method, path, handler });
};

export const clientDeletePlugin = {
  name: 'clientDeletePlugin',
  register: registerClientDelete
};
