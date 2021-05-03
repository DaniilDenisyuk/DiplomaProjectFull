import messagesAT from "../actionTypes/messages";
const initialState = {
  message: "",
  type: "",
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case messagesAT.ADD_ERROR_MESSAGE: {
      const { message } = action.payload;
      return {
        message,
        type: "error",
      };
    }
    case messagesAT.ADD_INFO_MESSAGE: {
      const { message } = action.payload;
      return {
        message,
        type: "info",
      };
    }
    case messagesAT.ADD_SUCCESS_MESSAGE: {
      const { message } = action.payload;
      return {
        message,
        type: "success",
      };
    }
    default:
      return state;
  }
};

export default messages;
