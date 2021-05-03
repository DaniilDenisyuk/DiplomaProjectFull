export const getFilms = (store) => store.films.list;

export const getDashboard = (store) => {
  const { usersCount, profilesCount, profilesOver18 } = store.admin.dashboard;
  return { usersCount, profilesCount, profilesOver18 };
};

export const getWatchedUser = (store) => {
  const { profiles, userId, isLoading } = store.admin.watchedUser;
  const user = store.admin.users.list.find((user) => user.id === userId);
  return { profiles, user, isLoading };
};

export const getUserProfiles = (store) => store.admin.userProfiles;

export const getUsers = (store) => {
  const { list, isLoading } = store.admin.users;
  return { users: list, isLoading };
};

export const getProfiles = (store) => store.profiles;

export const getUser = (store) => {
  const { isLoggedIn, isLoggingIn, user, isRegistering } = store.auth;
  return { isLoggedIn, isLoggingIn, user, isRegistering };
};

export const getMessage = (store) => store.message;

export const getToken = (store) => store.auth.jwt;
