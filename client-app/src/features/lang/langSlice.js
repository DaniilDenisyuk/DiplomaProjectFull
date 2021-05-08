const initialState = "ua";

export const langConstants = {
  setLang: "lang/setLang",
};

const setLang = (lang) => ({
  type: langConstants.setLang,
  payload: { lang },
});

export const langActions = {
  setLang,
};

export const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case langConstants.setLang: {
      const { lang } = action.payload;
      return lang;
    }
    default:
      return state;
  }
};
