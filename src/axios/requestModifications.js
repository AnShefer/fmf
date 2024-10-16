export const requestHandler = (request) => {
  const token = localStorage.getItem('token');
  if (token) request.headers.Authorization = `${token}`;
  request.headers['x-api-key'] = import.meta.env.VITE_API_SECRET_KEY;
  return request;
};

export const successHandler = (response) => ({
  ...response,
  data: response.data,
});
export const errorHandler = (error) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { status, data } = error?.response;
  if (status === 401 || data?.message === 'Unauthorized Access to an operation') {
    /* empty */
  }
  return Promise.reject(error);
};
