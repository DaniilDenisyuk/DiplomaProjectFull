const handleResponse = (response) => {
  if (response.status >= 300) {
    const error =
      (response.data && response.data.message) || response.statusText;
    return Promise.reject(error);
  }
  return Promise.resolve(response.data);
};

export default handleResponse;
