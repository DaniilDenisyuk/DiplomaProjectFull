const initialState = {
  isLoading: false,
  id: "",
  name: "",
};

export const locationConstants = {
  setLocation: "location/setLocation",
};

const setLocation = (id, name) => ({
  type: locationConstants.setLocation,
  payload: { id, name },
});

export const locationActions = {
  setLocation,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationConstants.setLocation: {
      const { id, name } = action.payload;
      return { id, name };
    }
    default:
      return state;
  }
};
