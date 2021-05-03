import dashboardAT from "../actionTypes/dashboard";

const initialState = {
  isLoading: false,
  profilesCount: null,
  usersCount: null,
  profilesOver18: null,
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case dashboardAT.ADD_INFO: {
      const { profilesCount, usersCount, profilesOver18 } = action.dashboard;
      return {
        profilesCount,
        usersCount,
        profilesOver18,
      };
    }
    case dashboardAT.DASHBOARD_LOADING:
      return {
        isLoading: true,
      };
    case dashboardAT.LOADING_FAILED:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dashboard;
