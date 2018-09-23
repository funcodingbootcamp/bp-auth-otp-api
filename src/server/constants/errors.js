export const HTTP_ERROR_400 = {
  error: {
    code: 400,
    messsage: 'Sorry, Bad Client Request'
  }
};

export const HTTP_ERROR_500 = {
  error: {
    code: 500,
    messsage: 'Sorry, Server Error'
  }
};

export const createError = (message, code = 400) => ({
  error: {
    code,
    message
  }
});
