import messagesAT from "../actionTypes/messages";

const addInfo = (message) => ({
  type: messagesAT.ADD_INFO_MESSAGE,
  payload: { message },
});

const addError = (message) => ({
  type: messagesAT.ADD_ERROR_MESSAGE,
  payload: { message },
});

const addSuccess = (message) => ({
  type: messagesAT.ADD_SUCCESS_MESSAGE,
  payload: { message },
});

export const messageActions = {
  addError,
  addInfo,
  addSuccess,
};
